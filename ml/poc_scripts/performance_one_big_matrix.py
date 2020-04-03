import numpy as np
import time


# 1000 entites, 1000 sentences by entity, embedding size 768
nb_entities = 1000
nb_sentences_by_entity = 100
size_embedding = 768

embeddings = np.random.rand(nb_entities, nb_sentences_by_entity, size_embedding)

np.save("embeddings_saved.npy", embeddings)

t1 = time.thread_time()
loaded_embeddings = np.load("./embeddings_saved.npy")
t2 = time.thread_time()

tot_time = t2 - t1
print(tot_time)

