import cv2
from rembg import remove
from PIL import Image
import os

def process_image(input_path, output_path):
    image = cv2.imread(input_path)
    if image is None:
        print(f"Error: Unable to read the image at {input_path}")
        return False
    resized_image = cv2.resize(image, (192, 256))

    # Remove background
    pil_image = Image.fromarray(cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB))
    removed_bg = remove(pil_image)

    # Change background to white
    white_bg = Image.new("RGBA", removed_bg.size, "WHITE")
    final_image = Image.alpha_composite(white_bg, removed_bg)

    # Save the final image (overwrite)
    final_image = final_image.convert("RGB")  # Convert to RGB to drop alpha channel
    final_image.save(output_path)
    return True

def process_folder(folder_path):
    for file_name in os.listdir(folder_path):
        input_path = os.path.join(folder_path, file_name)
        output_path = input_path  # Overwrite the original file
        success = process_image(input_path, output_path)
        if success:
            print(f"Processed: {file_name}")
        else:
            print(f"Failed to process: {file_name}")

# This script should not be run directly but is called by the second script.
