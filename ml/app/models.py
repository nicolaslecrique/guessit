from dataclasses import dataclass, field
from typing import List

import numpy as np


@dataclass
class Entity:
    db_id: int
    uri: str
    sentences: List[str] = field(default_factory=list)
    embeddings_matrix: np.ndarray = None

    def append_sentence_embedding(self, sentence: str, embedding: np.ndarray) -> None:
        self.sentences.append(sentence)
        if self.embeddings_matrix is not None:
            self.embeddings_matrix = np.append(self.embeddings_matrix, embedding, axis=0)
        else:
            self.embeddings_matrix = embedding
