from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

app = FastAPI(title="INNOVGENIUS API", version="0.1.0")

# CORS setup to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for prototype ease, or keep specific for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to INNOVGENIUS Backend"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
