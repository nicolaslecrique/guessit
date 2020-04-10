cd back
./gradlew build
cd ..

# NB: nothing to "build" for ml service before we build container

# build and run ml/back and db images
docker-compose up --build -d

# build and run front
cd front

npm install

npm run build:docker
npx serve -s build

cd ..