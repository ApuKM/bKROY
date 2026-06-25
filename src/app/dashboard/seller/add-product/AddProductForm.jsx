"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  Select,
  Label,
  ListBox,
  TextArea,
  TextField,
  Input,
} from "@heroui/react";
import { FiImage, FiFileText } from "react-icons/fi";

const inputBaseStyles =
  "w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 rounded-lg px-3 py-2.5 placeholder:text-zinc-500 transition-all duration-200 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-[#0A7C6E]";
const selectTriggerStyles =
  "w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2.5 text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-0";

export default function AddProductForm() {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {/* Media Section */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/50">
          <h2 className="text-lg font-medium text-white">Product Image</h2>
        </div>
        <div className="p-6">
          <label
            htmlFor="product-image"
            className="border-2 border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
          >
            <div className="p-4 bg-zinc-800 rounded-full mb-4 group-hover:bg-zinc-700 transition-colors">
              <FiImage className="text-2xl text-zinc-400 group-hover:text-zinc-300" />
            </div>

            <p className="text-sm font-medium text-white mb-1">
              Click to upload or drag and drop
            </p>

            <p className="text-xs text-zinc-500">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>

            {fileName && (
              <p className="mt-3 text-sm text-emerald-400">
                Selected: {fileName}
              </p>
            )}
          </label>

          <input
            ref={fileInputRef}
            id="product-image"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/svg+xml"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/50">
          <h2 className="text-lg font-medium text-white">Product Details</h2>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Product Title */}
          <TextField className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-300">
              Product Title
            </Label>
            <Input
              className={inputBaseStyles}
              type="text"
              placeholder="e.g. Vintage Leather Jacket"
            />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <Select className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">
                Category
              </Label>

              <Select.Trigger className={selectTriggerStyles}>
                <Select.Value placeholder="Select category" />
              </Select.Trigger>

              <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">
                <ListBox className="p-1">
                  <ListBox.Item
                    id="electronics"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Electronics
                  </ListBox.Item>

                  <ListBox.Item
                    id="clothing"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Clothing & Apparel
                  </ListBox.Item>

                  <ListBox.Item
                    id="home"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Home & Garden
                  </ListBox.Item>

                  <ListBox.Item
                    id="sports"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Sports & Outdoors
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Condition */}
            <Select className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">
                Condition
              </Label>

              <Select.Trigger className={selectTriggerStyles}>
                <Select.Value placeholder="Select condition" />
              </Select.Trigger>

              <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">
                <ListBox className="p-1">
                  <ListBox.Item
                    id="like-new"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Like New
                  </ListBox.Item>

                  <ListBox.Item
                    id="refurbished"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Refurbished
                  </ListBox.Item>

                  <ListBox.Item
                    id="used"
                    className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    Used
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="border-t border-zinc-800 my-2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* Price */}
            <TextField className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">Price</Label>
              <Input
                className={inputBaseStyles}
                type="number"
                placeholder="0.00"
              />
            </TextField>

            {/* Stock Quantity */}
            <TextField className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">
                Stock Quantity
              </Label>
              <Input
                className={inputBaseStyles}
                type="number"
                placeholder="e.g. 50"
              />
            </TextField>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/50">
          <h2 className="text-lg font-medium text-white">Description</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="product-description"
              className="text-sm font-medium text-zinc-300 flex items-center gap-2 mb-1"
            >
              <FiFileText className="text-zinc-400" />
              Detailed Description
            </Label>
            <TextArea
              className={inputBaseStyles}
              id="product-description"
              placeholder="Describe your product's features, specifications, and what makes it special..."
              rows={6}
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 px-5 rounded-md">
          Cancel
        </Button>
        <Button className="bg-[#0A7C6E] text-white hover:bg-[#0A7C6E]/90 font-semibold min-w-[120px] rounded-md shadow-[0_0_20px_rgba(91,94,245,0.2)] hover:shadow-[0_0_28px_rgba(91,94,245,0.4)] transition-all duration-200">
          Create Product
        </Button>
      </div>
    </form>
  );
}
