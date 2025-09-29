import pandas as pd

def process_excel(file_path):
    # Load Excel with all sheets
    excel = pd.ExcelFile(file_path)
    all_data = {}

    for sheet in excel.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet)

        # Fix unnamed columns
        df.columns = [col if "Unnamed" not in str(col) else f"Column_{i}" for i, col in enumerate(df.columns)]

        all_data[sheet] = df

    return all_data
