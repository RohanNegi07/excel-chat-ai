import streamlit as st
import pandas as pd
import tempfile
import os
import openai

openai.api_key = "api key"  # Replace with your key

st.set_page_config(page_title="Excel AI Query", layout="wide")
st.title("📊 AI Excel Data Query Platform")

uploaded_file = st.file_uploader("Upload any Excel file", type=["xlsx", "xls", "xlsb"])

DATA_STORE = {}

def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [f"column_{i}" if str(col).startswith("Unnamed") else col for i, col in enumerate(df.columns)]
    df.fillna(method="ffill", inplace=True)
    df.fillna(method="bfill", inplace=True)
    return df

def process_query(df: pd.DataFrame, question: str) -> str:
    prompt = f"""
    You are a data assistant. Here is a preview of my dataset:\n{df.head().to_string()}
    \nAnswer this question clearly: {question}
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

if uploaded_file:
    st.info("Processing file...")
    suffix = os.path.splitext(uploaded_file.name)[-1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(uploaded_file.read())
        tmp_path = tmp.name

    try:
        xls = pd.ExcelFile(tmp_path)
        sheets = {sheet_name: xls.parse(sheet_name) for sheet_name in xls.sheet_names}

        DATA_STORE["sheets"] = {}
        for name, df in sheets.items():
            DATA_STORE["sheets"][name] = clean_dataframe(df)

        st.success("File processed successfully!")
        sheet_name = st.selectbox("Select a sheet to query", list(sheets.keys()))
        st.write(DATA_STORE["sheets"][sheet_name].head())

        question = st.text_input("Enter your question about the data")
        if st.button("Ask AI"):
            if question.strip() != "":
                with st.spinner("AI is thinking..."):
                    answer = process_query(DATA_STORE["sheets"][sheet_name], question)
                    st.markdown("### 📝 Answer")
                    st.write(answer)
            else:
                st.error("Please enter a question.")

    except Exception as e:
        st.error(f"Error processing file: {str(e)}")
