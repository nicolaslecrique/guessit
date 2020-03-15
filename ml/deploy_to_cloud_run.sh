# build docker image then upload it to google container registry
gcloud builds submit --tag gcr.io/ibo-speak/ml
# deploy image from container registry to google cloud run
gcloud run deploy --image gcr.io/ibo-speak/ml --platform managed