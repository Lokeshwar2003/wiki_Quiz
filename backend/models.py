from sqlalchemy import Column, Integer, String, JSON
from pydantic import BaseModel
from typing import List, Dict, Any
from database import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, index=True)
    questions = Column(JSON)

class QuizQuestion(BaseModel):
    question: str
    options: Dict[str, str]
    answer: str

class QuizData(BaseModel):
    topic: str
    questions: List[QuizQuestion]
