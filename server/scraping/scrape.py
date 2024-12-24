import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin
import argparse

SCRAPING_FOLDER_PATH = 'scraping/downloaded_images'
SCRAPING = 'scraping'
FOLDER_NAME = 'downloaded_images'
FILE_NAME = 'last_image.jpg'

def download_last_image(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to retrieve page. Status code: {response.status_code}")
        return
    
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Find all <img> tags in the page
    img_tags = soup.find_all("img")
    
    if img_tags:
        # Get the last image tag
        last_img_tag = img_tags[-1]
        
        # Extract the src or srcset
        img_url = last_img_tag.get("src") or last_img_tag.get("srcset")
        
        if img_url:
            # Ensure the URL is absolute
            img_url = urljoin(url, img_url)  # Converts relative URLs to absolute URLs
            
            # Create a directory to store downloaded images (if not already created)
            if not os.path.exists(SCRAPING_FOLDER_PATH):
                os.makedirs(SCRAPING_FOLDER_PATH)
            
            # Get the image filename (name it as "last_image.jpg")
            img_name = os.path.join(SCRAPING, FOLDER_NAME, FILE_NAME)
            
            try:
                # Download the image and save it
                img_data = requests.get(img_url).content
                with open(img_name, "wb") as file:
                    file.write(img_data)
                print(f"Last image downloaded as {img_name}")
            except Exception as e:
                print(f"Error downloading the last image: {e}")
        else:
            print("Last image does not have a valid URL.")
    else:
        print("No images found on the page.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download the last image from a webpage.")
    parser.add_argument("url", type=str, help="The URL of the webpage to scrape.")
    args = parser.parse_args()
    print(args.url)
    download_last_image(args.url)

# Go to everlane site, choose an outfit that matches the current model (atm a shirt),
# make sure there is an image of the shirt without a model, copy the url and paste it here
# run python scrape.py
