import React from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Article_data } from "../context/context";
import Image from "next/image";
import MaterialSymbolsAlarm from "./icon/Clock";
import Link from "next/link";
import MaterialSymbolsArrowLeftAltRounded from "./icon/BackArrow";

export default function Detail() {
  //Detail will show data from Context that store from Home page and search page .Cos I can't find the detail api in NY times docs.
  const { article } = useContext(Article_data);
  const router = useRouter();

  return (
    <div>
      {article ? (
        <div className="max-w-3xl mx-auto  mt-1 mb-10 p-4 ">
          <div
            className="mb-7 cursor-pointer"
            onClick={() => {
              router.back(); // Go back to the previous page
            }}
          >
            <MaterialSymbolsArrowLeftAltRounded />
          </div>
          <div>
            {/* article data structure don't have same structure that store from Home page and search page */}
            <p className="font-bold text-3xl my-3">
              {article?.id ? article.title : article.headline.main}
            </p>
          </div>
          <div className="flex  justify-end mb-5 mt-2 mr-3">
            <MaterialSymbolsAlarm className="text-gray-400 mr-2" />
            <p className="text-sm mt-0.5">
              {article.id ? article.updated : article.pub_date}
            </p>
          </div>
          <div className="mb-5">
            <Image
              className="w-full h-80 md:h-96 rounded-t-sm object-cover "
              alt="detail photo"
              width={100}
              height={100}
              src={
                article.id
                  ? article.media[0]["media-metadata"][0].url
                  : "https://static01.nyt.com/" + article.multimedia[0]?.url
              }
            />
            <div className="flex">
              <div className="bg-red-500 w-1 h-30"></div>
              <p className="text-sm text-gray-600">
                {article.id ? article.byline : article.byline.original}
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-4">
              {article.id ? article.title : article.snippet}
            </p>
          </div>
          <div>
            {/* for more text count */}
            <p className="mb-4 text-gray-800">
              {article.id
                ? article.abstract + article.title
                : article.abstract + article.snippet}
            </p>
          </div>
          <div className="flex">
            <div className="bg-gray-600 w-4 h-4 mt-1 mr-1"></div>
            <p>{article.id ? article.section : article.type_of_material}</p>
          </div>
        </div>
      ) : (
        // If reload page , context api will clear
        <div className="min-h-[70vh] mt-8 text-sm flex  justify-center">
          <p>
            Not Found .Go to{" "}
            <Link href="/" className="text-blue-500 underline">
              Home Page
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
