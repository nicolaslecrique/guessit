
USE ibo;
SET NAMES utf8;

CREATE USER ibo_api_db_user IDENTIFIED BY 'test-ibo-psw';
GRANT ALL ON ibo.* TO ibo_api_db_user;
