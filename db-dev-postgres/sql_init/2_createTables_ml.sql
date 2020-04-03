
-- All tables has
-- id: primary_key, int, for join requests and foreign keys, should not be exposed to service clients
-- uri: unique identifier, immutable, can be exposed
-- creation_datetime: for diagnostics

CREATE TABLE ibo_ml.entity_to_guess(
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE ibo_ml.sentence_embedding(
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	sentence VARCHAR(2046) NOT NULL,
	sentence_embedding JSON NOT NULL,
	entity_to_guess_id INT NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	sentence_embedding_blob real[] NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(entity_to_guess_id) REFERENCES ibo_ml.entity_to_guess(id),
	UNIQUE(uri)
);
