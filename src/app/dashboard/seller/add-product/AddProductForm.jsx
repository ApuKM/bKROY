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
  toast,
} from "@heroui/react";
import { FiImage, FiFileText } from "react-icons/fi";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

const inputBaseStyles =
  "w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 rounded-lg px-3 py-2.5 placeholder:text-zinc-500 transition-all duration-200 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-[#0A7C6E]";
const selectTriggerStyles =
  "w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2.5 text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-0";

export default function AddProductForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructured react-hook-form methods
  const { register, handleSubmit, control, reset } = useForm();

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const uploadImageToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMAGE_API;
    if (!apiKey) {
      throw new Error("ImgBB API key missing");
    }
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await response.json();
    if (!result.success) {
      throw new Error("ImgBB upload failed");
    }
    return result.data.display_url;
  };

  const onSubmit = async (data) => {
    // console.log("Clicked");
    try {
      setIsSubmitting(true);
      let imageUrls = "";

      if (selectedFiles) {
        imageUrls = await Promise.all(selectedFiles.map(uploadImageToImgBB));
      }

      // Combine form data with the uploaded image URL
      const payload = {
        ...data,
        image: imageUrls,
      };

      console.log("Form Payload:", payload);
      // await createProduct(payload);

      toast.success("Product created successfully");
      reset(); // Reset form fields on success
      setSelectedFiles(null);
      setImagePreviews(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
            {imagePreviews.length !== 0 ? (
              <div className="grid grid-cols-4 gap-3">
                {imagePreviews.map((src) => (
                  <Image key={src} src={src} width={120} height={120} alt="" />
                ))}
              </div>
            ) : (
              <>
                <div className="p-4 bg-zinc-800 rounded-full mb-4 group-hover:bg-zinc-700 transition-colors">
                  <FiImage className="text-2xl text-zinc-400 group-hover:text-zinc-300" />
                </div>

                <p className="text-sm font-medium text-white mb-1">
                  Click to upload or drag and drop
                </p>

                <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF</p>
              </>
            )}

            {selectedFiles &&
              selectedFiles.map((file) => (
                <p key={file.index} className="mt-3 text-sm text-emerald-400">
                  {file.name}
                </p>
              ))}
          </label>

          <input
            ref={fileInputRef}
            id="product-image"
            multiple
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
              {...register("title", { required: true })}
              className={inputBaseStyles}
              type="text"
              placeholder="e.g. Vintage Leather Jacket"
            />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  className="flex flex-col gap-1.5"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  isRequired
                >
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
                        textValue="Electronics"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Electronics
                      </ListBox.Item>

                      <ListBox.Item
                        id="clothing"
                        textValue="Clothing & Apparel"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Clothing & Apparel
                      </ListBox.Item>

                      <ListBox.Item
                        id="home"
                        textValue="Home & Garden"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Home & Garden
                      </ListBox.Item>

                      <ListBox.Item
                        id="sports"
                        textValue="Sports & Outdoors"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Sports & Outdoors
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />

            {/* Condition */}
            <Controller
              name="condition"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  className="flex flex-col gap-1.5"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  isRequired
                >
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
                        textValue="Like New"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Like New
                      </ListBox.Item>

                      <ListBox.Item
                        id="refurbished"
                        textValue="Refurbished"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Refurbished
                      </ListBox.Item>

                      <ListBox.Item
                        id="used"
                        textValue="Used"
                        className="text-zinc-200 rounded-md px-3 py-2 hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        Used
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
          </div>

          <div className="border-t border-zinc-800 my-2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* Price */}
            <TextField className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">Price</Label>
              <Input
                {...register("price", { required: true, valueAsNumber: true })}
                className={inputBaseStyles}
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </TextField>

            {/* Stock Quantity */}
            <TextField className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">
                Stock Quantity
              </Label>
              <Input
                {...register("stockQuantity", {
                  required: true,
                  valueAsNumber: true,
                })}
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
              {...register("description", { required: true })}
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
        <Button
          type="button"
          onClick={() => {
            reset();
            setSelectedFile(null);
            setImagePreview(null);
          }}
          className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 px-5 rounded-md"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="bg-[#0A7C6E] text-white hover:bg-[#0A7C6E]/90 font-semibold min-w-[120px] rounded-md shadow-[0_0_20px_rgba(91,94,245,0.2)] hover:shadow-[0_0_28px_rgba(91,94,245,0.4)] transition-all duration-200"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
