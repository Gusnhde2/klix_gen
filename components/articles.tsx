"use client";
import { useEffect, useState } from "react";

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from "@mui/material";

export default function Articles({
  selectedArticle,
}: {
  selectedArticle: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [articles, setArticles] = useState([]);
  const [articleType, setArticleType] = useState("najnovije" as string);
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    setLoading(true);
    const response = await fetch("/api/scrape", {
      body: JSON.stringify({ page: articleType }),
      method: "POST",
    });
    const data = await response.json();
    setArticles(data.articles);
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, [articleType]);

  return (
    <Card variant="outlined" className="md:p-5 md:mr-20 w-full">
      <Container className="flex flex-col gap-5">
        <h3>klix.ba članci</h3>
        <ButtonGroup
          variant="text"
          aria-label="outlined primary button group"
          style={{ marginBottom: "1rem" }}
        >
          <Button
            onClick={() => setArticleType("najnovije")}
            style={{
              backgroundColor: `${
                articleType === "najnovije" ? "rgb(55 65 81)" : "transparent"
              }`,
            }}
          >
            Najnovije
          </Button>
          <Button
            onClick={() => setArticleType("najcitanije")}
            style={{
              backgroundColor: `${
                articleType === "najcitanije" ? "rgb(55 65 81)" : "transparent"
              }`,
            }}
          >
            Najčitanije
          </Button>
        </ButtonGroup>
        {loading && (
          <div className="flex justify-center w-full">
            <CircularProgress />
          </div>
        )}
        {!loading &&
          articles.map((article: any, index) => (
            <Card
              className="md:w-50"
              key={index}
              style={{ marginBottom: "1rem" }}
            >
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
