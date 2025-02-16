"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useWallet } from "@/contexts/wallet-context"; 

export default function SearchAndFilter({
  initialData = [],
  onFilter,
  searchKeys = [],
  placeholder = "Search...",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCount, setFilterCount] = useState(0);
  const { requireWallet } = useWallet();

  // Generic search function
  const performSearch = (query) => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      setFilterCount(0);
      return initialData;
    }

    const filteredResults = initialData.filter((item) =>
      searchKeys.some((key) => {
        const value = key.split(".").reduce((obj, k) => obj?.[k], item);
        return String(value).toLowerCase().includes(trimmedQuery);
      })
    );

    setFilterCount(filteredResults.length > 0 ? 1 : 0);
    return filteredResults;
  };

  const handleSearchChange = (e) => {
    requireWallet(() => {
      const query = e.target.value;
      setSearchQuery(query);
      const results = performSearch(query);
      onFilter(results);
    });
  };

  const clearFilters = () => {
    requireWallet(() => {
      setSearchQuery("");
      setFilterCount(0);
      onFilter(initialData);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex bg-zinc-800 border border-zinc-700 rounded-md shadow text-white text-sm">
        <div className="w-10 grid place-content-center text-zinc-400">
          <Image
            src={"/images/search-icon.svg"}
            width={20}
            height={20}
            alt="Search"
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="bg-transparent py-1.5 outline-none placeholder:text-zinc-400 w-48 focus:w-60 transition-all"
        />
        <button
          onClick={() => setSearchQuery("")}
          className="w-10 grid place-content-center text-zinc-400"
        >
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height="16"
            width="16"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <button
        className="relative p-2 rounded-3xl bg-[#2D2A34] border border-[#464558]"
        onClick={clearFilters}
      >
        <Image
          src="/images/filter-icon.svg"
          width={20}
          height={20}
          className="mx-2 w-5 h-5"
          alt="Filter"
        />
        {filterCount > 0 && (
          <span className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 bg-[#AA00FF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {filterCount}
          </span>
        )}
      </button>
    </div>
  );
}