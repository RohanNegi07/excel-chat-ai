import pandas as pd
import numpy as np

def clean_data(excel_data):
    cleaned_data = {}

    for sheet, df in excel_data.items():
        # Strip spaces from column names
        df.columns = [col.strip() for col in df.columns]

        # Fill missing values
        df.fillna(method="ffill", inplace=True)
        df.fillna(method="bfill", inplace=True)

        # Convert all data to correct types if possible
        for col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="ignore")

        cleaned_data[sheet] = df

    return cleaned_data
