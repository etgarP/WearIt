#!/bin/bash

# Source the conda.sh script
source ~/miniconda3/etc/profile.d/conda.sh  # Adjust the path if Miniconda/Anaconda is installed elsewhere

# Activate the Conda environment
conda activate tryOn

# Your other commands here
cd PF-AFN_test  # Replace with the path to your Bash script
bash test.sh
cd ../