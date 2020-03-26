
USE ibo_ml;
SET NAMES utf8;

-- All tables has
-- id: primary_key, int, for join requests and foreign keys, should not be exposed to service clients
-- uri: unique identifier, immutable, can be exposed
-- creation_datetime: for diagnostics

CREATE TABLE entity_to_guess(
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE sentence_embedding(
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	sentence VARCHAR(2046) NOT NULL,
	sentence_embedding JSON NOT NULL,
	entity_to_guess_id INT NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(entity_to_guess_id) REFERENCES entity_to_guess(id),
	UNIQUE(uri)
);
