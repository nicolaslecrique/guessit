SET NAMES utf8;

CREATE USER ibo_back_db_user IDENTIFIED BY 'test-ibo_back-psw';
GRANT ALL ON ibo_back.* TO ibo_back_db_user;

CREATE USER ibo_ml_db_user IDENTIFIED BY 'test-ibo_ml-psw';
GRANT ALL ON ibo_ml.* TO ibo_back_db_user;