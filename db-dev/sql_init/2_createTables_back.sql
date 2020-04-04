
-- All tables has
-- id: primary_key, int, for join requests and foreign keys, should not be exposed to service clients
-- uri: unique identifier, immutable, can be exposed
-- creation_datetime: for diagnostics

CREATE TABLE ibo_back.entity_to_guess(
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE ibo_back.user (
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE ibo_back.game_session (
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(user_id) REFERENCES ibo_back.user(id),
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE ibo_back.entity_guessing(
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	game_session_id INT NOT NULL,
	entity_to_guess_id INT NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(game_session_id) REFERENCES ibo_back.game_session(id),
	FOREIGN KEY(entity_to_guess_id) REFERENCES ibo_back.entity_to_guess(id),
	PRIMARY KEY (id),
	UNIQUE(uri)
);

CREATE TABLE ibo_back.entity_guessing_sentence(
	id SERIAL,
	uri VARCHAR(255) NOT NULL,
	entity_guessing_id INT NOT NULL,
	sentence VARCHAR(2046) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(entity_guessing_id) REFERENCES ibo_back.entity_guessing(id),
	PRIMARY KEY (id),
	UNIQUE(uri)
);
