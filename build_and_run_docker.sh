cd back
./gradlew build
cd ..

cd front
npm run build
cd..

# NB: nothing to "build" for ml service before we build container

docker-compose up --build -d