import Link from "next/link";
import React from "react";
import Image from "next/image";
import IcRoundSearch from "./icon/SearchIcon";
export default function Navbar() {
  return (
    <nav className=" bg-black text-white shadow-lg">
      <div className="grid grid-cols-3 ">
        <div className="lg:pl-20 md:pl-10 pl-4">
          <Link href="/">
            <Image src="/news_logo.png" alt="me" width="60" height="60" />
          </Link>
        </div>
        <div className="p-4">
          <Link
            href={{
              pathname: "/",
            }}
          >
            <p className="font-bold text-white text-lg text-center">
              Morning News
            </p>
          </Link>
        </div>
        <div className="text-center flex p-4 justify-end sm:mr-4">
          <Link className="px-2 mt-1 sm:px-6 text-sm " href="/">
            Home
          </Link>
          <Link
            className="px-4 -mt-1 hidden  w-56 sm:hidden md:block"
            href="/search-page"
          >
            <div className="flex bg-slate-700	hover:bg-slate-600 px-4 py-2">
              <IcRoundSearch className="h-6 mr-1 " />
              <span className="text-sm mt-0.5">Search</span>
            </div>
          </Link>
          <Link
            className="block md:hidden -mt-0.5 px-2 sm:px-6"
            href="/search-page"
          >
            <IcRoundSearch />
          </Link>
        </div>
      </div>
    </nav>
  );
}
