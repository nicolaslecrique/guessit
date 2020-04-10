from typing import Dict

import numpy as np
import psycopg2

from app.models import Entity


def connect():
    # Calling connect with an empty string uses PG* environment variables as parameters
    # https://www.psycopg.org/docs/module.html#psycopg2.connect
    # https://github.com/psycopg/psycopg2/issues/767
    return psycopg2.connect('')

def get_all_entities() -> Dict[str, Entity]:
    connection = connect()
    cursor = connection.cursor()

    query = ("select entity.id, entity.uri, sentence.sentence, sentence.sentence_embedding "
             "from ibo_ml.entity_to_guess entity "
             "join ibo_ml.sentence_embedding sentence on entity.id = sentence.entity_to_guess_id")
    cursor.execute(query)

    entities = dict()
    for (entity_id, entity_uri, sentence, sentence_embedding) in cursor:
        entity = entities.setdefault(entity_uri, Entity(db_id=entity_id, uri=entity_uri))

        embedding_np = np.asarray([sentence_embedding])

        entity.append_sentence_embedding(sentence, embedding_np)

    cursor.close()
    connection.close()

    return entities

def insert_sentence_embedding(sentence: str, embedding: np.ndarray, entity_id: int) -> None:
    connection = connect()
    cursor = connection.cursor()

    query = "INSERT INTO ibo_ml.sentence_embedding (sentence, sentence_embedding, entity_to_guess_id) VALUES (%s, %s, %s)"
    data = (sentence, embedding.tolist(), entity_id)

    cursor.execute(query, data)

    connection.commit()

    cursor.close()
    connection.close()

def insert_entity(uri: str) -> int:
    connection = connect()
    cursor = connection.cursor()

    query = "INSERT INTO ibo_ml.entity_to_guess(uri) VALUES (%s) RETURNING id;"
    data = (uri,)

    cursor.execute(query, data)

    entity_id = cursor.fetchone()[0]

    connection.commit()

    cursor.close()
    connection.close()

    return entity_id
