# build docker image then upload it to google container registry
gcloud builds submit --tag gcr.io/ibo-speak/ml
# restat VM ml-1 with latest image
gcloud compute instances update-container ml-1 --container-image gcr.io/ibo-speak/ml:latest
