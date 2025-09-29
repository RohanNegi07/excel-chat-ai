import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def answer_query(question):
    if not question:
        return "Please provide a valid question."

    prompt = f"Answer this vague question clearly: {question}"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )

    return response.choices[0].text.strip()
