# suppose that you have installed cloud_sql_proxy and a service account key "cloud_sql_proxy_service_account_private_key_ibo-speak.json"
# cf. https://cloud.google.com/sql/docs/postgres/connect-admin-proxy?hl=en_US
../../../tools/sql-gcloud-proxy/cloud_sql_proxy -instances=ibo-speak:europe-west1:ibo-postgres=tcp:5433 -credential_file=cloud_sql_proxy_service_account_private_key_ibo-speak.json
