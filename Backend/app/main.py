import os

from fastapi import FastAPI

app = FastAPI(title="Car Dealership Inventory System")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}