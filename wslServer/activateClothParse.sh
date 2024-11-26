#!/bin/bash

# Source the conda.sh script
source ~/miniconda3/etc/profile.d/conda.sh  # Adjust the path if Miniconda/Anaconda is installed elsewhere

# Activate the Conda environment
conda activate clothParse

# Your other commands here

python3 removeBG.py

python3 clothModel.py