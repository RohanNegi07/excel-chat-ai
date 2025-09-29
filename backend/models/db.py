import os

UPLOAD_DIR = "uploads/"

def save_file(file):
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(file_path)
    return file_path
