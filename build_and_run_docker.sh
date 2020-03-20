cd back
./gradlew build
cd ..

# NB: nothing to "build" for ml service before we build container

# build and run ml and back image
docker-compose up --build -d

# build and run front
cd front
npm run build:docker
serve -s build

cd..