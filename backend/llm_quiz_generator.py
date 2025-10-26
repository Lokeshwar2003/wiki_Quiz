import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from models import QuizData

load_dotenv()

def generate_quiz_chain():
    # Initialize the Gemini model
    llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=os.getenv("GEMINI_API_KEY"))

    # Create the output parser
    parser = JsonOutputParser(pydantic_object=QuizData)

    # Create the prompt template
    prompt = PromptTemplate(
        template="""
        You are an expert quiz maker. Based on the following content, create a quiz with 5 multiple-choice questions.
        Each question should have 4 options (A, B, C, D) and one correct answer.
        Return the quiz as a JSON object with the topic and a list of questions.

        Content:
        {context}

        {format_instructions}
        """,
        input_variables=["context"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    # Create the LangChain chain
    chain = prompt | llm | parser
    return chain
