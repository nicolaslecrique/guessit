
CREATE USER ibo_back_db_user PASSWORD 'test-ibo_back-psw';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ibo_back TO ibo_back_db_user;

CREATE USER ibo_ml_db_user PASSWORD 'test-ibo_ml-psw';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ibo_ml TO ibo_ml_db_user;
GRANT ALL PRIVILEGES ON SCHEMA ibo_ml TO ibo_ml_db_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ibo_ml TO ibo_ml_db_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA ibo_ml TO ibo_ml_db_user;