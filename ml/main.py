import uvicorn
from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware

# don't change variable name, it's use by docker image : https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker
app = FastAPI()


# Todo: manage security properly if exposed to the internet
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


