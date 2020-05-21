from typing import Dict, List, Tuple

import numpy as np
from sentence_transformers import SentenceTransformer

from app import database as db
from app import models


class Guesser:
    def __init__(self, transformers_model: str) -> None:
        self.ml_model: SentenceTransformer = SentenceTransformer(transformers_model)

        self.entities: Dict[str, models.Entity] = db.get_all_entities()
        self.embeddings_cache: Dict[str, np.ndarray] = {}

    def guess(self, query_sentences: List[str]) -> Dict[str, float]:
        query_sentences, query_embeddings_matrix = self._embeddings_matrix(query_sentences)

        guesses = self._similarities(query_embeddings_matrix)

        return dict(guesses[:4])

    def add_sentences(self, entity_uri: str, query_sentences: List[str])-> None:
        guessed_entity = self._get_or_create_entity(entity_uri)

        query_sentences, query_embeddings_matrix = self._embeddings_matrix(query_sentences)

        # Store unknown sentences/embeddings in db
        for sentence, embedding in zip(query_sentences, query_embeddings_matrix):
            # While iterating over the matrix we get (N,) vectors instead of (1, N) matrices:
            #   - To append the embedding to the entity matrix: We need a (1, N) matrix
            #   - To store the embedding in DB: We need a (N,) vector

            guessed_entity.append_sentence_embedding(sentence, embedding.reshape(1, -1))

            db.insert_sentence_embedding(sentence, embedding, guessed_entity.db_id)

    def _get_or_create_entity(self, entity_uri: str) -> models.Entity:
        guessed_entity = self.entities.get(entity_uri, None)
        if guessed_entity is None:
            db_id = db.insert_entity(entity_uri)

            guessed_entity = models.Entity(db_id=db_id, uri=entity_uri)
            self.entities[entity_uri] = guessed_entity

        return guessed_entity

    def _embeddings_matrix(self, query_sentences: List[str]) -> Tuple[List[str], np.ndarray]:
        # Distinguish known/unknown sentences
        known_sentences = []
        unknown_sentences = []

        known_embeddings = []
        for sentence in query_sentences:
            embedding = self.embeddings_cache.get(sentence, None)
            if embedding is not None:
                known_sentences.append(sentence)
                known_embeddings.append(embedding)
            else:
                unknown_sentences.append(sentence)

        # Compute unknown sentences embeddings matrix
        unknown_embeddings = self._normalized_embeddings(unknown_sentences)

        # Store unknown sentences/embeddings in cache
        self.embeddings_cache.update(zip(unknown_sentences, unknown_embeddings))

        # Construct an embeddings matrix containing both known and unknown sentences
        query_embeddings_matrix = np.concatenate(known_embeddings + unknown_embeddings)

        # /!\ Sentence are reorganized to match the order in the embeddings matrix /!\
        query_sentences = known_sentences + unknown_sentences

        return query_sentences, query_embeddings_matrix

    def _similarities(self, query_embeddings_matrix: np.ndarray) -> List[Tuple[str, float]]:
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

        return guesses

    def _normalized_embeddings(self, sentences: List[str]) -> np.ndarray:
        embeddings_list = self.ml_model.encode(sentences)

        def normalize_and_reshape(vector: np.ndarray) -> np.ndarray:
            # reshape: from (N,) vector to (1, N) matrix
            return (vector / np.linalg.norm(vector)).reshape(1, vector.shape[0])

        return [normalize_and_reshape(embedding) for embedding in embeddings_list]
