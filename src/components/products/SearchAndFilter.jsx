"use client";

import React from "react";
import { FiSearch, FiGrid, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import { Select } from "@heroui/react";
import { Label } from "@heroui/react";
import { ListBox } from "@heroui/react";

export default function SearchAndFilterBar({ filters, onFilterChange }) {
  const categories = [
    "All",
    "Electronics",
    "Vehicles",
    "Property",
    "Fashion",
    "Home & Living",
  ];


  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };


  return (
    <div className="bg-[#18181b] border border-zinc-800/80 rounded-2xl p-4 md:p-6 mb-8 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        {/* --- 1. Search Bar --- */}
        <div className="relative grow max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-zinc-500" size={18} />
          </div>
          <input
            type="text"
            name="searchQuery"
            value={filters?.searchQuery || ""}
            onChange={handleChange}
            placeholder="Search for laptops, bikes, phones..."
            className="w-full bg-[#27272a]/50 border border-zinc-700 text-white placeholder-zinc-500 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#0A7C6E] focus:ring-1 focus:ring-[#0A7C6E] transition-all duration-150"
          />
        </div>

        {/* --- 2. Filters & Sorting Group --- */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          {/* Category Dropdown */}
          <div className="relative">
            <div className="w-full sm:w-40">
              <Select
                value={filters.category}
                onChange={(val) => {
                  if (val) {
                    onFilterChange({ category: String(val) });
                  }
                }}
                placeholder="Category"
              >
                <Label className="sr-only">Category</Label>

                {/* CHANGED: text-white to text-zinc-400 here to make the whole trigger gray */}
                <Select.Trigger className="bg-[#27272a] border-none rounded-xl text-sm text-white w-full flex justify-between items-center px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <FiGrid className="text-zinc-400" size={16} />
                    <Select.Value />
                  </div>
                  <Select.Indicator>
                    <FiChevronDown />
                  </Select.Indicator>
                </Select.Trigger>

                <Select.Popover className={"bg-zinc-800 "}>
                  <ListBox className="p-1 outline-none ">
                    {categories.map((cat) => (
                      <ListBox.Item
                        key={cat}
                        id={cat}
                        textValue={cat}
                        className="p-2 hover:bg-[#3f3f46] rounded-lg cursor-pointer text-sm text-white"
                      >
                        <Label className="cursor-pointer text-zinc-300">
                          {cat === "All" ? "All Categories" : cat}
                        </Label>
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
