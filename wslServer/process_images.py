import subprocess
import shutil
import os
import sys

def run_bash_script(bash_script_path):
    """
    Runs a Bash script that activates a Conda environment and runs a Python script.
    """
    try:
        # Run the Bash script
        subprocess.run(['bash', bash_script_path], check=True)
        print(f"Successfully ran Bash script: {bash_script_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error running Bash script: {e}")
        sys.exit(1)

def move_file(src_path, dest_path):
    """
    Moves a file from src_path to dest_path.
    """
    try:
        shutil.move(src_path, dest_path)
        print(f"Successfully moved {src_path} to {dest_path}")
    except Exception as e:
        print(f"Error moving file: {e}")
        sys.exit(1)

run_bash_script("activateClothParse.sh")
run_bash_script("activateTryOn.sh")
file_to_move = 'PF-AFN_test/results/demo/PFAFN/0.jpg'  
move_to_path = 'dst-images/model.jpg'  
move_file(file_to_move, move_to_path)
