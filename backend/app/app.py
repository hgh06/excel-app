from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import os

from utils.file_handler import modify_excel, save_file

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

@app.route('/')
def index():
    return "Hello World!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    file_path = save_file(file)
    if file_path is None:
        return jsonify({'error': 'Invalid file type. Only .xlsx files are allowed.'}), 400
    
    # Modify the Excel file using openpyxl
    try:
        modified_file_path = modify_excel(file_path)
        
        # Send the modified file back to the user as a download
        return send_file(modified_file_path, as_attachment=True, download_name=f"modified_{file.filename}")
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
