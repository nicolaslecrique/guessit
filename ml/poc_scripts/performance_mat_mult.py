import numpy as np
import time

# 1000 entites, 1000 sentences by entity, embedding size 768
nb_entities = 500
nb_sentences_by_entity = 1000
size_embedding = 768
nb_sentences_for_guess = 20

embeddings_base = np.random.rand(nb_entities, nb_sentences_by_entity, size_embedding)

embeddings_request = np.random.rand(size_embedding,nb_sentences_for_guess)

t1 = time.thread_time()

# test 1) with 3D matrix
nb_iterations = 1
for i in range(0,nb_iterations):

    mult_result = np.dot(embeddings_base, embeddings_request)
    result_sum_by_base_embedding = np.sum(mult_result, axis=2)
    result_by_entity = np.average(result_sum_by_base_embedding, axis=1)
    ranking_entites = np.argsort(-result_by_entity)

t2 = time.thread_time()
print((t2-t1)/nb_iterations)


# test 2) with 2D matrix
embeddings_base_flattened = np.random.rand(nb_entities*nb_sentences_by_entity, size_embedding)
t1 = time.thread_time()

nb_iterations = 10
for i in range(0,nb_iterations):

    mult_result = np.dot(embeddings_base_flattened, embeddings_request)
    result_sum_by_base_embedding = np.sum(mult_result, axis=1)
    result_sum_by_base_embedding_reshape = result_sum_by_base_embedding.reshape(nb_entities, nb_sentences_by_entity)
    result_by_entity = np.average(result_sum_by_base_embedding_reshape, axis=1)
    ranking_entites = np.argsort(-result_by_entity)

t2 = time.thread_time()
print((t2-t1)/nb_iterations)
