FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD ibo-db-root-pwd
# container will execute scripts on docker-entrypoint-initdb.d folder by alphabetical order
# cf. https://hub.docker.com/_/mysql/, initialize a fresh instance
COPY sql_init /docker-entrypoint-initdb.d

# /var/lib/mysql-files is the directory on mysql container where LOAD_FILE operation is allowed, set by secure_file_priv config key
# https://dev.mysql.com/doc/refman/5.5/en/string-functions.html#function_load-file
# https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_secure_file_priv
# SHOW VARIABLES LIKE "secure_file_priv";
# COPY mysql-files /var/lib/mysql-files