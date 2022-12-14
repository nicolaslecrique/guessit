import os

import uvicorn
from fastapi import FastAPI
from app import endpoints, guesser

def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(endpoints.router)

    # PG* environment variables are used by psycopg2.connect()
    if 'PGHOST' not in os.environ:
        os.environ['PGHOST'] = 'localhost'
        os.environ['PGDATABASE'] = 'postgres'
        os.environ['PGUSER'] = 'ibo_ml_db_user'
        os.environ['PGPASSWORD'] = 'test-ibo_ml-psw'

    transformers_model = os.environ.get('TRANSFORMERS_MODEL', 'ml_model')

    app.state.guesser = guesser.Guesser(transformers_model)

    return app

# don't change variable name, it's use by docker image :
# https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker
app = create_app()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8060)
