import { Carousel, Col, Layout, Row, Typography } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context/Message";
import { getNews } from "../../api/other/news";

import "./news.styles.scss";

export function News() {
  const { message } = useContext(MessageContext);
  const [news, setNews] = useState([]);

  const getFromNews = useCallback(async () => {
    try {
      const res = await getNews();
      setNews(res.data.news);
    } catch (err) {
      message.catch(err, "Get news");
    }
  }, []);

  useEffect(() => {
    getFromNews();
  }, []);

  return (
    <Carousel className="news-carousel" autoplay autoplaySpeed={30000}>
      {news.length !== 0 ? (
        news.map((item) => (
          <div className="news-container" key={item.id + "_news"}>
            <Layout
              className="news-image"
              style={{
                backgroundImage: `url(./${item.image})`,
              }}
            ></Layout>
            <Row>
              <Col span={24} className="text-top">
                <Typography.Title>{item.title}</Typography.Title>
              </Col>
              <Col span={12} className="text-left">
                <p>{item.text}</p>
              </Col>
              <Col span={12} className="text-right">
                <a href={item.link} target="_blank" rel="noreferrer">
                  Learn more this.
                </a>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <></>
      )}
    </Carousel>
  );
}
