"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image'; // Make sure to import Image from Next.js
import { useParams } from 'next/navigation';

export default function DestinationsMenu({ destinations }: { destinations: any }) {
  const [selectedItem, setSelectedItem] = useState("");
  const params = useParams();

  useEffect(() => {
    setSelectedItem(params.name as string);
  }, [params.name]);

  return (
    <div>
      <div>
        <Link href="/destination/all" className="font-bold text-center flex justify-center">
          <h1
            className={`category_sidebar_menu w-full flex items-center justify-center ${
              selectedItem === "all"
                ? "md:bg-blue-100 bg-blue-900 shadow-md shadow-sky-300"
                : ""
            }`}
            onClick={() => setSelectedItem("all")}
          >
            ALL
          </h1>
        </Link>
        {destinations?.map((destination: any) => (
          <Link
            href={`/destination/${destination.name}`}
            key={destination.id}
            className={`category_sidebar_menu flex items-center gap-2 ${
              selectedItem === destination.name
                ? "md:bg-blue-100 bg-blue-900 shadow-md shadow-sky-400"
                : ""
            }`}
            onClick={() => setSelectedItem(destination.name)}
          >
            <Image src={destination.image} alt={destination.name} width={30} height={30} />
            {destination.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
