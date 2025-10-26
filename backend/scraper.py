import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str) -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the main content of the article
        content_div = soup.find(id='mw-content-text')

        # Remove unnecessary elements like tables, infoboxes, and references
        for element in content_div.find_all(['table', 'div.infobox', 'div.reflist', 'div.thumb', 'div.gallery']):
            element.decompose()

        # Extract text from paragraphs
        paragraphs = content_div.find_all('p')
        text = '\n'.join([para.get_text() for para in paragraphs])
        
        return text
    except requests.exceptions.RequestException as e:
        print(f"Error scraping Wikipedia URL: {e}")
        return None
