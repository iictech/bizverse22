#import statements
from fastapi import FastAPI
from routes.routes import apiRouter
from fastapi.middleware.cors import CORSMiddleware

apiDescription = """
## Bizverse mailing microservice
### Version: 0.1.0
"""

app = FastAPI(title="Bizverse Microservice", description=apiDescription, contact={
              "name": "Bizverse'22, IIC Techno Main Saltlake", "url": "https://iictmsl.in/"})

origins = [
    "http://localhost:3000", "https://iicblog.netlify.app", "https://iic-extn.herokuapp.com"
]

# what is a middleware?
# software that acts as a bridge between an operating system or database and applications, especially on a network.

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register router
app.include_router(apiRouter)
