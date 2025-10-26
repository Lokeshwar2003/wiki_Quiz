from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import scraper
import llm_quiz_generator
from database import SessionLocal, engine
import json

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from pydantic import BaseModel

class WikiURLRequest(BaseModel):
    url: str

@app.post("/generate_quiz")
def generate_quiz(request: WikiURLRequest, db: Session = Depends(get_db)):
    # Scrape Wikipedia content
    content = scraper.scrape_wikipedia(request.url)
    if not content:
        raise HTTPException(status_code=400, detail="Failed to scrape Wikipedia URL.")

    # Generate quiz using LLM
    chain = llm_quiz_generator.generate_quiz_chain()
    quiz_data = chain.invoke({"context": content})

    # Save quiz to database
    db_quiz = models.Quiz(topic=quiz_data['topic'], questions=quiz_data['questions'])
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)

    return db_quiz

@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    quizzes = db.query(models.Quiz).all()
    return quizzes

@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # The questions are stored as a JSON string, so we need to parse them
    if isinstance(quiz.questions, str):
        quiz.questions = json.loads(quiz.questions)
        
    return quiz

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)