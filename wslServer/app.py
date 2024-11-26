from flask import Flask, jsonify, request, send_file
from PIL import Image
import io
import os
import subprocess  # For calling external Python script

app = Flask(__name__)

# Path to save the images
UPLOAD_FOLDER_CLOTH = 'PF-AFN_test/dataset/test_clothes'
UPLOAD_FOLDER_MODEL = 'PF-AFN_test/dataset/test_img'
os.makedirs(UPLOAD_FOLDER_CLOTH, exist_ok=True)
os.makedirs(UPLOAD_FOLDER_MODEL, exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "Hello from WSL!"})

# Route to receive two images (cloth.jpg and model.jpg)
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'cloth' not in request.files or 'model' not in request.files:
        return jsonify({"error": "Both 'cloth' and 'model' images are required"}), 400

    cloth_file = request.files['cloth']
    model_file = request.files['model']

    if cloth_file.filename == '' or model_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the images
    cloth_path = os.path.join(UPLOAD_FOLDER_CLOTH, 'cloth.jpg')
    model_path = os.path.join(UPLOAD_FOLDER_MODEL, 'model.jpg')
    
    try:
        cloth_file.save(cloth_path)
        model_file.save(model_path)

        # Call the external Python script to process the images
        # Replace 'process_images.py' with your actual script name
        subprocess.run(['python3', 'process_images.py', cloth_path, model_path])

        # Once processing is done, load and return the processed image
        processed_image_path = 'dst-images/model.jpg'  # Path to the output image
        processed_image = Image.open(processed_image_path)

        # Prepare the image to send it back as a response
        img_byte_arr = io.BytesIO()
        processed_image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        
        return send_file(img_byte_arr, mimetype='image/jpeg')

    except Exception as e:
        return jsonify({"error": f"Error processing images: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
