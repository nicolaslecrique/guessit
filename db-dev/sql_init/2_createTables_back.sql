-- All tables has
-- id: primary_key, int, for join requests and foreign keys, should not be exposed to service clients
-- uri: unique identifier, immutable, can be exposed
-- creation_datetime: for diagnostics

CREATE TABLE ibo_back.entity_to_guess(
	id SERIAL PRIMARY KEY,
	uri VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ibo_back.user (
	id SERIAL PRIMARY KEY,
	uri VARCHAR(255) NOT NULL UNIQUE,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ibo_back.game_session (
	id SERIAL PRIMARY KEY,
	uri VARCHAR(255) NOT NULL UNIQUE,
	user_id INT NOT NULL REFERENCES ibo_back.user(id),
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ibo_back.entity_guessing(
	id SERIAL PRIMARY KEY,
	uri VARCHAR(255) NOT NULL UNIQUE,
	game_session_id INT NOT NULL REFERENCES ibo_back.game_session(id),
	entity_to_guess_id INT NOT NULL REFERENCES ibo_back.entity_to_guess(id),
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ibo_back.entity_guessing_sentence(
	id SERIAL PRIMARY KEY,
	uri VARCHAR(255) NOT NULL UNIQUE,
	entity_guessing_id INT NOT NULL REFERENCES ibo_back.entity_guessing(id),
	sentence VARCHAR(2046) NOT NULL,
	creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
