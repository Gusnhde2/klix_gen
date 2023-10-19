"use client";
import { useEffect, useState } from "react";

import { Button, Card, CardContent, Container } from "@mui/material";

export default function Articles({
  selectedArticle,
}: {
  selectedArticle: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const response = await fetch("/api/scrape");
    const data = await response.json();
    setArticles(data);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Card variant="outlined" className="md:p-5">
      <Container className="flex flex-col gap-5 ">
        <h3>Najnoviji klix.ba članci</h3>
        {articles.map((article: any, index) => (
          <Card style={{ width: "100%" }} key={index}>
            <CardContent
              onClick={selectedArticle}
              className="cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100"
            >
              <p>{article.title}</p>
            </CardContent>
            <div className="border-x-0 border-y-0 border-t-2 border-solid border-gray-200">
              <Button
                href={`https://www.klix.ba${article.link}`}
                target="_blank"
              >
                LINK
              </Button>
              <Button
                href={`https://www.klix.ba${article.link}/komentari`}
                target="_blank"
              >
                KOMENTARI
              </Button>
            </div>
          </Card>
        ))}
      </Container>
    </Card>
  );
}
