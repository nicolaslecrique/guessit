import numpy as np
import time
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

nb_entities = 500
nb_sentences_by_entity = 100
size_embedding = 768
nb_sentences_for_guess = 20

def test_matmult_3d():
    embeddings_base = np.random.rand(nb_entities, nb_sentences_by_entity, size_embedding)

    embeddings_request = np.random.rand(size_embedding,nb_sentences_for_guess)

    t1 = time.thread_time()

    # test 1) with 3D matrix
    nb_iterations = 10
    for i in range(0,nb_iterations):

        mult_result = np.dot(embeddings_base, embeddings_request)
        result_sum_by_base_embedding = np.sum(mult_result, axis=2)
        result_by_entity = np.average(result_sum_by_base_embedding, axis=1)
        ranking_entites = np.argsort(-result_by_entity)

    t2 = time.thread_time()
    print("3D*2D")
    print((t2-t1)/nb_iterations)

def test_matmult_2d():
    # test 2) with 2D matrix
    embeddings_base_flattened = np.random.rand(nb_entities*nb_sentences_by_entity, size_embedding)
    
    embeddings_request = np.random.rand(size_embedding,nb_sentences_for_guess)
    
    t1 = time.thread_time()

    nb_iterations = 10
    for i in range(0,nb_iterations):

        mult_result = np.dot(embeddings_base_flattened, embeddings_request)
        result_sum_by_base_embedding = np.sum(mult_result, axis=1)
        result_sum_by_base_embedding_reshape = result_sum_by_base_embedding.reshape(nb_entities, nb_sentences_by_entity)
        result_by_entity = np.average(result_sum_by_base_embedding_reshape, axis=1)
        ranking_entites = np.argsort(-result_by_entity)

    t2 = time.thread_time()
    print("2D*2D")
    print((t2-t1)/nb_iterations)


def test_matmult_2d_1_sentence():
    # test 3 with only one sentence
    embeddings_base_flattened = np.random.rand(nb_entities*nb_sentences_by_entity, size_embedding)
    embeddings_request_1_sentence = np.random.rand(size_embedding)
    t1 = time.thread_time()

    nb_iterations = 100
    for i in range(0,nb_iterations):

        mult_result = np.dot(embeddings_base_flattened, embeddings_request_1_sentence)
        result_sum_by_base_embedding_reshape = mult_result.reshape(nb_entities, nb_sentences_by_entity)
        result_by_entity = np.average(result_sum_by_base_embedding_reshape, axis=1)
        ranking_entites = np.argsort(-result_by_entity)


    t2 = time.thread_time()
    print("2D*1D")
    print((t2-t1)/nb_iterations)

def test_with_model():
    model = SentenceTransformer('ml_model')

    embeddings_base_flattened = np.random.rand(nb_entities*nb_sentences_by_entity, size_embedding)

    t1 = time.thread_time()

    nb_iterations = 10
    for i in range(0,nb_iterations):

        embeddings_request_1_sentence = model.encode('This is my query:' + str(i))[0]
        #similarities = cosine_similarity(embeddings_base_flattened, query_embedding)

        mult_result = np.dot(embeddings_base_flattened, embeddings_request_1_sentence)
        result_sum_by_base_embedding_reshape = mult_result.reshape(nb_entities, nb_sentences_by_entity)
        result_by_entity = np.average(result_sum_by_base_embedding_reshape, axis=1)
        ranking_entites = np.argsort(-result_by_entity)

        

    t2 = time.thread_time()
    print((t2-t1)/nb_iterations)

#test_matmult_3d()
#test_matmult_2d()
#test_matmult_2d_1_sentence()
test_with_model()
