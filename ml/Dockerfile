
FROM python:3.7

WORKDIR /usr/app

EXPOSE 80

# Install requirements before copying app so pip install is not re-runned if requirements dont change
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]


# # See what's int the container
# sudo docker run -it ml-img sh

# # start
# docker-compose up --build
