from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from frontend (CORS policy)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only; restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/intern")
def get_intern():
    return {
        "name": "Panda",
        "referral_code": "panda2025",
        "donations_raised": 4200
    }

@app.get("/api/leaderboard")
def get_leaderboard():
    return {
        "leaders": [
            {"name": "Panda", "amount": 4200},
            {"name": "Alex", "amount": 3500},
            {"name": "Riya", "amount": 3000}
        ]
    }
