
## Dependencies

* docker & docker-compose

## Build and run docker images

execute ./build_and_run_docker.sh

## Tools

to execute get / post queries directly on back/ml: https://www.postman.com/

## Setup a new cloud environment

* Create a new project on google cloud

### Setup back

* Create a new service on Google cloud run
* Create a new spring boot config (application-{ENV}.yml)
* following prod environment, set appropriate environment variables for back container in cloud run (https://cloud.google.com/run/docs/configuring/environment-variables) (SPRING_PROFILES_ACTIVE, and variables used in application-{ENV}.yml like ML_SERVICE_URL...)
* Adapt deploy_to_cloud_run.sh (to correct project and cloud_run_service)

### Setup front

* Create a new project on firebase. On creation, associate it to the google cloud project
* Activate firebase hosting
* Create a new npm build config (build:ENV in package.json) to set correct back api url
* Adapt to deploy_to_firebase_hosting.sh (to deploy to correct project firebase project)

### Setup ml

* Create a new VM on Google compute engine
* Use compute engine OS customized for container (https://cloud.google.com/compute/docs/containers/deploying-containers)
* Accept connection by http (will be called by back)
* Set static public IP (to be seen by back container) (https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address), for now there is no way to access it internally (inside google cloud) from cloud run (https://cloud.google.com/run/docs/using-gcp-services)
* Connect to database (https://cloud.google.com/sql/docs/mysql/connect-compute-engine)
* adapt deploy_to_comput_engine.sh

### Setp Mysql database

* Create a mysql image on google cloud SQL
* Connect back cloud run to mysql cloud SQL: https://cloud.google.com/sql/docs/mysql/connect-run
* Connect to database with Mysql workbench (https://cloud.google.com/sql/docs/mysql/connect-admin-proxy) and run init scripts to create client user for back (change password!) and tables
