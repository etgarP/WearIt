import cv2
from rembg import remove
from PIL import Image
import os

def crop_to_aspect(image, target_width, target_height):
    """
    Crops the image to the target aspect ratio by removing parts from the center.
    """
    h, w, _ = image.shape
    target_aspect = target_width / target_height
    current_aspect = w / h

    if current_aspect > target_aspect:
        # Wider than target, crop width
        new_width = int(h * target_aspect)
        start_x = (w - new_width) // 2
        cropped_image = image[:, start_x:start_x + new_width]
    else:
        # Taller than target, crop height
        new_height = int(w / target_aspect)
        start_y = (h - new_height) // 2
        cropped_image = image[start_y:start_y + new_height, :]

    return cropped_image

def zoom_into_cloth(image, zoom_factor):
    """
    Zoom into the cloth region by a given factor from the center of the image.
    Assumes the cloth image is in the 'test_clothes' folder.
    """
    h, w, _ = image.shape
    new_h, new_w = int(h / zoom_factor), int(w / zoom_factor)
    start_y = (h - new_h) // 2
    start_x = (w - new_w) // 2
    zoomed_image = image[start_y:start_y + new_h, start_x:start_x + new_w]
    return zoomed_image

def process_image(input_path, output_path, is_cloth_image=False):
    image = cv2.imread(input_path)
    if image is None:
        print(f"Error: Unable to read the image at {input_path}")
        return False

    if is_cloth_image:
        # Zoom into the cloth region by 45% only if the image is from the 'test_clothes' folder
        zoomed_image = zoom_into_cloth(image, zoom_factor=1.45)
    else:
        zoomed_image = image

    # Crop the image to 192x256 aspect ratio
    cropped_image = crop_to_aspect(zoomed_image, 192, 256)

    # Resize to target dimensions
    resized_image = cv2.resize(cropped_image, (192, 256))

    if not is_cloth_image:
        # Remove background only if it's not a cloth image
        pil_image = Image.fromarray(cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB))
        removed_bg = remove(pil_image)

        # Change background to white
        white_bg = Image.new("RGBA", removed_bg.size, "WHITE")
        final_image = Image.alpha_composite(white_bg, removed_bg)

        # Convert to RGB and save
        final_image = final_image.convert("RGB")  # Convert to RGB to drop alpha channel
    else:
        # For cloth images, simply use the resized image without background removal
        final_image = Image.fromarray(cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB))

    # Save the final image (overwrite)
    final_image.save(output_path)
    return True

def process_folder(folder_path, is_cloth_image=False):
    for file_name in os.listdir(folder_path):
        input_path = os.path.join(folder_path, file_name)
        output_path = input_path  # Overwrite the original file
        success = process_image(input_path, output_path, is_cloth_image)
        if success:
            print(f"Processed: {file_name}")
        else:
            print(f"Failed to process: {file_name}")

# Process the 'test_clothes' folder with zoom applied to the cloth images
process_folder("PF-AFN_test/dataset/test_clothes", is_cloth_image=True)
# Process the 'test_img' folder without zooming (no cloth zoom needed here)
process_folder("PF-AFN_test/dataset/test_img", is_cloth_image=False)
