
USE ibo_back;
SET NAMES utf8;

-- All tables has
-- id: primary_key, int, for join requests and foreign keys, should not be exposed to service clients
-- uri: unique identifier, immutable, can be exposed
-- creation_datetime: for diagnostics

CREATE TABLE entity_to_guess(
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE game_session (
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(user_id) REFERENCES user(id),
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE entity_guessing(
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	game_session_id INT NOT NULL,
	entity_to_guess_id INT NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(game_session_id) REFERENCES game_session(id),
	FOREIGN KEY(entity_to_guess_id) REFERENCES entity_to_guess(id),
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE entity_guessing_sentence(
	id INT NOT NULL AUTO_INCREMENT,
	uri VARCHAR(255) NOT NULL,
	entity_guessing_id INT NOT NULL,
	sentence VARCHAR(2046) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(entity_guessing_id) REFERENCES entity_guessing(id),
	PRIMARY KEY (id),
	UNIQUE(uri)
);
