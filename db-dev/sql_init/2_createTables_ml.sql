-- All tables has
-- id: primary_key, int, for join requests and foreign keys, should not be exposed to service clients
-- uri: unique identifier, immutable, can be exposed
-- creation_datetime: for diagnostics

CREATE TABLE ibo_ml.entity_to_guess(
	id SERIAL PRIMARY KEY,
	uri VARCHAR(255) NOT NULL UNIQUE,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ibo_ml.sentence_embedding(
	id SERIAL PRIMARY KEY,
	sentence VARCHAR(2046) NOT NULL,
	sentence_embedding real[] NOT NULL,
	entity_to_guess_id INT NOT NULL REFERENCES ibo_ml.entity_to_guess(id),
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
