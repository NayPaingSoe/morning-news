import { useState, useContext } from "react";
import IcRoundSearch from "./icon/SearchIcon";
import GridiconsCross from "./icon/CrossIcon";
import Image from "next/image";
import { Article_data } from "../context/context";
import { useRouter } from "next/router";
import EosIconsLoading from "./icon/LoadingIcon";

export default function SearchPage() {
  const nytimesApiKey = process.env.NEXT_PUBLIC_NYTIMES_API_KEY;
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResultFound, setNoResultFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { article, setArticle } = useContext(Article_data);
  const router = useRouter();

  // Function to store the selected article in context and navigate to its details page
  const storeDetailArticle = (article) => {
    setArticle(article);
    const parts = article._id.split("/");
    const id = parts[parts.length - 1];
    router.push(`/search-page/${id}`);
  };

  // Function to fetch articles based on the search input
  const searchAricles = async () => {
    try {
      setLoading(true);
      setNoResultFound(false);
      const res = await fetch(
        ` https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchInput}&sort=newest&api-key=${nytimesApiKey}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setSearchResults(data.response.docs);
      if (data.response.docs.length == 0) {
        setNoResultFound(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto lg:max-w-2xl xl:max-w-4xl mt-8 min-h-[80vh]">
      <div className="flex flex-auto">
        <div className="grow bg-gray-200">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <IcRoundSearch className="h-6" />
            </span>
            <input
              className="bg-gray-200 tracking-wide pl-10 hover:outline-none focus:outline-none border focus:border-black appearance-none w-full pb-3 pt-3.5 px-5 text-gray-700 leading-tight"
              id="username"
              type="text"
              placeholder="Search Articles"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
            />
            {searchInput && (
              <span
                onClick={() => {
                  setSearchInput("");
                  setSearchResults([]);
                  setNoResultFound(false);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-cyan-700 hover:text-white w-12"
              >
                <GridiconsCross className=" ml-3.5" />
              </span>
            )}
          </div>
        </div>
        <div>
          <button
            className="  px-3 py-3 bg-gray-200 hover:bg-cyan-700 hover:text-white font-bold tracking-wider"
            onClick={searchAricles}
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center pt-16">
            <EosIconsLoading />
          </div>
        ) : (
          <div>
            {searchResults?.map((item) => (
              <div
                className="shadow-sm cursor-pointer mb-8 bg-white sm:grid sm:grid-cols-2 sm:pb-3"
                key={item._id}
                onClick={() => storeDetailArticle(item)}
              >
                <Image
                  width={100}
                  height={100}
                  className="w-full h-60 sm:h-40 sm:w-full lg:h-64 lg:w-full xl:w-full rounded-t-sm object-cover "
                  src={"https://static01.nyt.com/" + item.multimedia[0]?.url}
                  alt=""
                ></Image>
                <div className="sm:px-4 md:pt-1">
                  <p className="mt-2  font-bold text-black-400 hover:underline  hover:text-blue-800">
                    {item.headline.main}
                  </p>
                  <p className="text-gray-600 text-sm my-3">{item.abstract}</p>
                  <p className="text-gray-700 text-sm">{item.pub_date}</p>
                </div>
              </div>
            ))}
            <div>
              {noResultFound && (
                <p className="mt-8 text-sm">There is not result found .</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
