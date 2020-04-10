
FROM python:3.7-slim

WORKDIR /usr/app

EXPOSE $PORT

RUN apt-get update \ 
        && apt-get install -y --no-install-recommends  build-essential libpq-dev \
        && rm -rf /var/lib/apt/lists/*

# Install requirements before copying app so pip install is not re-runned if requirements dont change
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app
COPY ml_model ml_model

CMD exec uvicorn app.main:app --host 0.0.0.0 --port $PORT


# # See what's int the container
# sudo docker run -it ml-img sh

# # start
# docker-compose up --build
