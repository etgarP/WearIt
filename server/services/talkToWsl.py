import requests
from PIL import Image
import io

# Define the URL of your Flask server
url = 'http://localhost:5000/upload'

# Paths of the images to be uploaded
cloth_image_path = 'services\cloth.jpg'
model_image_path = 'services\model.jpg'

# Path where you want to save the cropped image
cropped_image_path = 'services\\triedOn.jpg'

# Open the images in binary mode for uploading
with open(cloth_image_path, 'rb') as cloth_file, open(model_image_path, 'rb') as model_file:
    files = {
        'cloth': ('cloth.jpg', cloth_file, 'image/jpeg'),
        'model': ('model.jpg', model_file, 'image/jpeg')
    }
    
    # Send a POST request with the images
    response = requests.post(url, files=files)

# Check the response from the server
if response.status_code == 200:
    # Open the received image from the response content
    processed_image = Image.open(io.BytesIO(response.content))
    
    # Crop the right third of the image
    width, height = processed_image.size
    cropped_image = processed_image.crop((2 * width // 3, 0, width, height))
    
    # Save the cropped image
    cropped_image.save(cropped_image_path)
    print(f"Cropped image saved at: {cropped_image_path}")
else:
    print(f"Failed to upload images. Status code: {response.status_code}")
    print("Error:", response.json())