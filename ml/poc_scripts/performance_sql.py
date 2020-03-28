import json
import pickle
import time
from datetime import datetime

from mysql.connector import connect
import numpy as np # numpy needs to be imported after mysql.connector otherwise we get a Segmentation fault !


def clean_data():
    connection = connect(user='ibo_ml_db_user', password='test-ibo_ml-psw', host='127.0.0.1', database='ibo_ml')
    cursor = connection.cursor()
    cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')
    cursor.execute('truncate table ibo_ml.entity_to_guess;')
    cursor.execute('truncate table ibo_ml.sentence_embedding;')
    cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')
    connection.commit()
    cursor.close()
    connection.close()

def insert_data(number_of_entities = 10, sentences_per_entity = 10):
    connection = connect(user='ibo_ml_db_user', password='test-ibo_ml-psw', host='127.0.0.1', database='ibo_ml')

    cursor = connection.cursor()

    add_entity_to_guess = ("INSERT INTO entity_to_guess (uri, creation_datetime) VALUES (%s, %s)")
    add_sentence_embedding = ("INSERT INTO sentence_embedding (uri, sentence, sentence_embedding, sentence_embedding_blob, entity_to_guess_id, creation_datetime) VALUES (%s, %s, %s, %s, %s, %s)")

    for i in range(number_of_entities):
        entity_uri = 'entity' + str(i)
        data_entity_to_guess = (entity_uri, datetime.now())

        cursor.execute(add_entity_to_guess, data_entity_to_guess)
        entity_id = cursor.lastrowid

        for j in range(sentences_per_entity):
            sentence = entity_uri + '_sentence' + str(j)
            embedding_np = np.random.randn(768)
            embedding_json = json.dumps(embedding_np.tolist())
            embedding_pickled = embedding_np.dumps()
            data_sentence_embedding = (sentence, sentence, embedding_json, embedding_pickled, entity_id, datetime.now())
            cursor.execute(add_sentence_embedding, data_sentence_embedding)

        connection.commit()

    cursor.close()
    connection.close()

def get_data_json():
    connection = connect(user='ibo_ml_db_user', password='test-ibo_ml-psw', host='127.0.0.1', database='ibo_ml')

    cursor = connection.cursor()

    query = ("select e.uri, s.sentence_embedding from ibo_ml.entity_to_guess e "
             "join ibo_ml.sentence_embedding s "
             "on e.id = s.entity_to_guess_id")

    deserialize_tot_time = 0
    tot_time_t1 = time.thread_time()
    cursor.execute(query)
    for (entity_uri, sentence_embedding) in cursor:
        deserialize_t1 = time.thread_time()
        embedding = np.asarray(json.loads(sentence_embedding))
        deserialize_tot_time += (time.thread_time() - deserialize_t1)
    tot_time = time.thread_time() - tot_time_t1

    print('Tot time:', tot_time)
    print('Deserialize tot time:', deserialize_tot_time)

    cursor.close()
    connection.close()

    return (tot_time, deserialize_tot_time)

def get_data_blob():
    connection = connect(user='ibo_ml_db_user', password='test-ibo_ml-psw', host='127.0.0.1', 
                         database='ibo_ml', use_pure=True)
    # use_pure=True to avoid this obscure error:
    # 'UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0: invalid start byte'
    # https://stackoverflow.com/questions/52759667/properly-getting-blobs-from-mysql-database-with-mysql-connector-in-python
    # Note data use_pure switch to the pure python implementation of the connector

    cursor = connection.cursor()

    query = ("select e.uri, s.sentence_embedding_blob from ibo_ml.entity_to_guess e "
             "join ibo_ml.sentence_embedding s "
             "on e.id = s.entity_to_guess_id")

    deserialize_tot_time = 0
    tot_time_t1 = time.thread_time()
    cursor.execute(query)
    for (entity_uri, sentence_embedding_blob) in cursor:
        deserialize_t1 = time.thread_time()
        embedding = pickle.loads(sentence_embedding_blob)
        deserialize_tot_time += (time.thread_time() - deserialize_t1)
    tot_time = time.thread_time() - tot_time_t1

    print('Tot time:', tot_time)
    print('Deserialize tot time:', deserialize_tot_time)

    cursor.close()
    connection.close()

    return (tot_time, deserialize_tot_time)

# Prerequisites:
# pip install mysql-connector-python==8.0.19
# For blob test: Add a column "sentence_embedding_blob BLOB NOT NULL" in sentence_embedding table

print('Cleaning/Inserting data')
clean_data()
insert_data(number_of_entities = 1000, sentences_per_entity = 100)
print('Data insert done\n')

print('Reading data')
nb_iterations = 10
sum_tot_time = 0
sum_deserialize_tot_time = 0
for i in range(nb_iterations):
    print('Iteration:', i)
    #tot_time, deserialize_tot_time = get_data_json()
    tot_time, deserialize_tot_time = get_data_blob()
    sum_tot_time += tot_time
    sum_deserialize_tot_time += deserialize_tot_time
print('Avg tot time:', sum_tot_time / nb_iterations)
print('Avg deserialize tot time:', sum_deserialize_tot_time / nb_iterations)
print('Read done')
