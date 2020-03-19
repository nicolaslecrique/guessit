# build jar
# TODO: could be replaced with 2-step docker build (cf. cloud run quick start for java/spring)
./gradlew build

# build docker image then upload it to google container registry
# this command should replace the two following (but it fails, to check) gcloud builds submit --tag gcr.io/ibo-speak/back
docker build . --tag gcr.io/ibo-speak/back
docker push gcr.io/ibo-speak/back

# deploy image from container registry to google cloud run
gcloud run deploy --image gcr.io/ibo-speak/back --platform managed

# NB: the SPRING_PROFILES_ACTIVE environment variable is set directly on google cloud run console to prod