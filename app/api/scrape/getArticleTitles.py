import requests
from bs4 import BeautifulSoup
import json

url = "https://www.klix.ba/najnovije"
response = requests.get(url)

soup = BeautifulSoup(response.content, "html.parser")

article_titles = []

for article in soup.find_all("article"):
    title = article.find("h2").text.strip()
    link = article.find("a")["href"]
    article_titles.append({"title": title, "link": link})

print(json.dumps(article_titles))
