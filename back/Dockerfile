FROM openjdk:8-jre-alpine
EXPOSE $PORT
COPY build/libs/back-0.0.1-SNAPSHOT.jar back-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "back-0.0.1-SNAPSHOT.jar"]
