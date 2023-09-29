import { useEffect, useState, useContext } from "react";
import { Article_data } from "../context/context";
import { useRouter } from "next/router";
import Image from "next/image";
import EosIconsLoading from "./icon/LoadingIcon";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const { article, setArticle } = useContext(Article_data);
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Function to fetch news data from the NY Times API
  const getNews = async () => {
    setLoading(true);
    try {
      const nytimesApiKey = process.env.NEXT_PUBLIC_NYTIMES_API_KEY;
      const res = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/${selectedDay}.json?api-key=${nytimesApiKey}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setLoading(false);
      setNews(data.results);
    } catch (error) {
      setNews([]);
      console.error("Error fetching news:", error);
    }
  };

  //Detail Page will show data from Context that stored from Home page and search page .Cos I can't find the detail api in NY times docs.
  const storeDetailArticle = (article) => {
    setArticle(article);
    router.push(`/search-page/${article.id}`);
  };
  // Fetch news data when the selectedDay state changes
  useEffect(() => {
    getNews();
  }, [selectedDay]);

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-5xl m-auto mt-10">
      <div className="ml-6 mb-8 mt-3 flex justify-end">
        <label className="mt-2 mr-2 text-sm">Articles in</label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setSelectedDay(e.target.value);
          }}
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>

      {loading ? (
        <div className="flex  justify-center">
          <EosIconsLoading />
        </div>
      ) : (
        <div className=" grid md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) =>
            item.media[0] ? (
              <div
                className="cursor-pointer my-2 md:mx-6 bg-white"
                key={item.id}
                onClick={() => storeDetailArticle(item)}
              >
                <div>
                  <Image
                    width={100}
                    height={100}
                    className="w-full h-56 rounded-t-sm object-cover "
                    src={item.media[0]["media-metadata"][0].url}
                    alt="se"
                  ></Image>
                </div>
                <p
                  className="mt-3 hover:text-blue-700 hover:underline font-semibold text-gray-800"
                  style={{ fontSize: "16px" }}
                >
                  {item.title}
                </p>
                <p className="mt-2 mb-5 text-sm text-gray-800 line leading-snug">
                  {item.abstract}
                </p>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
