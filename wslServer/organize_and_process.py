import os
import shutil
import sys
from process_images import process_folder

def organize_files(input_folder, model_folder, cloth_folder):
    # Ensure destination folders exist
    os.makedirs(model_folder, exist_ok=True)
    os.makedirs(cloth_folder, exist_ok=True)

    # Process the files in the input folder
    process_folder(input_folder)

    # Move files to their respective folders
    files = sorted(os.listdir(input_folder))
    if len(files) < 2:
        print("Error: Less than 2 files found in the input folder!")
        return

    model_file = files[0]  # First file
    cloth_file = files[1]  # Second file

    shutil.move(os.path.join(input_folder, model_file), os.path.join(model_folder, model_file))
    shutil.move(os.path.join(input_folder, cloth_file), os.path.join(cloth_folder, cloth_file))

    print(f"Moved {model_file} to {model_folder}")
    print(f"Moved {cloth_file} to {cloth_folder}")

if __name__ == "__main__":
    # if len(sys.argv) != 4:
    #     print("Usage: python organize_and_process.py <input_folder> <model_folder> <cloth_folder>")
    #     sys.exit(1)

    # input_folder = sys.argv[1]
    # model_folder = sys.argv[2]
    # cloth_folder = sys.argv[3]
    input_folder = "src-images"

    organize_files(input_folder, model_folder, cloth_folder)
