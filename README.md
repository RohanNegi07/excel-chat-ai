# Excel AI Query Platform

A Streamlit-based interactive platform that allows users to upload Excel files and query their data using AI-powered natural language queries. The app integrates OpenAI GPT-4 or similar models for intelligent analysis and responses.

# Features

Upload Excel Files: Supports .xlsx, .xls, and .xlsb formats.

Multiple Sheet Support: Automatically detects all sheets and allows selection.

Data Cleaning: Automatically fills missing data with forward/backward filling and renames unnamed columns.

AI Query: Ask questions about your dataset in plain English, and receive clear, AI-generated answers.

Real-Time Interaction: Instant AI responses powered by GPT-style models.

User-Friendly UI: Simple, responsive interface via Streamlit.

# Project Structure
excel-ai-query/
│
├── app.py               # Main Streamlit application
├── requirements.txt     # Dependencies
├── README.md            # Project documentation
├── utils.py             # Optional helper functions (data cleaning, query processing)
└── .env                 # API key storage (recommended)

# Installation
1. Clone Repository
git clone https://github.com/yourusername/excel-ai-query.git
cd excel-ai-query

2. Create Virtual Environment
python -m venv venv

3. Activate Environment

Windows:

venv\Scripts\activate


Mac/Linux:

source venv/bin/activate

4. Install Dependencies
pip install -r requirements.txt

# Dependencies

Key Python packages used:

streamlit — Interactive web app framework.

pandas — Data analysis and manipulation.

openai — AI query integration.

python-dotenv — Environment variable management (optional).

Example requirements.txt:

streamlit
pandas
openai
python-dotenv

# Configuration
OpenAI API Key

The app requires an OpenAI API key to work.

You can add your key in an .env file:

OPENAI_API_KEY=your_openai_api_key_here


Or set it in your Python code:

import openai
openai.api_key = "your_openai_api_key_here"


⚠️ Never commit API keys to public repositories.

# Usage

Run the app:

streamlit run app.py


Upload your Excel file.

Select the sheet you want to query.

Enter your question in plain English.

Click Ask AI to get your answer.

# How It Works

File Upload → The app uploads and stores the Excel file temporarily.

Data Cleaning → Automatically renames unnamed columns and fills missing values.

Sheet Selection → Displays a dropdown to choose sheets.

AI Query → Sends a preview of the dataset along with the question to GPT.

Response Display → Shows AI's answer below the query box.

# Example

Query:
"What is the average sales for Q2?"

AI Response:
"The average sales for Q2 based on the dataset preview is $45,230."

# Known Issues

Large Excel files may slow processing.

Model API rate limits apply.

AI answers depend on the quality and context of uploaded data.

# Future Improvements

Add file caching for quicker access.

Support for larger datasets with chunked processing.

Add chart generation based on queries.

Integrate multi-language support.