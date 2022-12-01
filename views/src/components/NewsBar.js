/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/NewsBar.css";

function NewsBar() {
  const [latestNews, setLatestNews] = useState("");

  const fetchNews = async () => {
    try {
      const news = await axios.get("/latestNews");
      const data = news.data;
      if (data != null) {
        const newsList = [];
        for (let i = 0; i < data.length; i++) {
          let title = data[i].title;
          newsList.push(
            <li key={i}>
              <span className="newsSpan">
                <b>
                  {title}&nbsp;&nbsp;&nbsp;
                  <a href={data[i].link} className="newsDetailsClass">
                    Details
                  </a>
                </b>
              </span>
              <hr />
            </li>
          );
        }
        setLatestNews(newsList);
      }
    } catch (e) {
      if (e.message === "Request failed with status code 429") {
        console.log("Per day request limit reached for NewsData.io API..!!");
        setLatestNews("Per day request limit reached for NewsData.io API..!!");
      } else {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    // Fetch latest news from NewsData.io API
    fetchNews();
  }, []);

  return (
    <div className="newsClass">
      <p className="latestNewsClass">Latest News</p>
      <ul>{latestNews}</ul>
    </div>
  );
}

export default NewsBar;
