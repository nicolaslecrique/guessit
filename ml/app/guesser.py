
from typing import List, Tuple

import numpy as np
from sentence_transformers import SentenceTransformer

from app import database as db
from app import models


class Guesser:
    def __init__(self, transformers_model: str) -> None:
        self.ml_model = SentenceTransformer(transformers_model)

        self.entities = db.get_all_entities()
        self.embeddings_cache = dict()

    def guess(self, entity_uri: str, query_sentences: List[str]) -> List[Tuple[str, float]]:
        # Is it a known entity ?
        guessed_entity = self.entities.get(entity_uri, None)
        if guessed_entity is None:
            db_id = db.insert_entity(entity_uri)

            guessed_entity = models.Entity(db_id=db_id, uri=entity_uri)
            self.entities[entity_uri] = guessed_entity

        # Distinguish known/unknown sentences
        known_embeddings = []
        unknown_sentences = []
        for sentence in query_sentences:
            embedding = self.embeddings_cache.get(sentence, None)
            if embedding is not None:
                known_embeddings.append(embedding)
            else:
                unknown_sentences.append(sentence)

        # Compute unknown sentences embeddings matrix
        unknown_embeddings = self._normalized_embeddings(unknown_sentences)

        # Construct an embeddings matrix containing both known and unknown sentences
        query_embeddings_matrix = np.concatenate(known_embeddings + unknown_embeddings)

        # Compute similarities
        guesses = []
        for _, entity in self.entities.items():
            if entity.embeddings_matrix is None:
                continue

            similarities = np.dot(entity.embeddings_matrix, query_embeddings_matrix.T)

            # Max similarity per sentence in the query & average of the max for each sentence
            max_similarity = np.max(similarities, axis=0)
            score = np.mean(max_similarity).item()

            guesses.append((entity.uri, score))

        guesses.sort(key=lambda x: x[1], reverse=True)

        # Store new sentences/embeddings in cache & db
        for sentence, embedding in zip(unknown_sentences, unknown_embeddings):
            guessed_entity.append_sentence_embedding(sentence, embedding)

            self.embeddings_cache[sentence] = embedding

            # The embedding is a (1, N) matrix, store it as a vector (N,) in db
            db.insert_sentence_embedding(sentence, embedding[0], guessed_entity.db_id)

        return guesses[:4]

    def _normalized_embeddings(self, sentences: List[str]) -> np.ndarray:
        embeddings_list = self.ml_model.encode(sentences)

        def normalize_and_reshape(vector) -> np.ndarray:
            # reshape: from (N,) vector to (1, N) matrix
            return (vector / np.linalg.norm(vector)).reshape(1, vector.shape[0])

        return [normalize_and_reshape(embedding) for embedding in embeddings_list]
