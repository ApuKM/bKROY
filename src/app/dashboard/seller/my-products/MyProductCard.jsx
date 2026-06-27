"use client";

import {
  Button,
  Chip,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  useOverlayState,
} from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { AlertDialog } from "@heroui/react";

const MyProductCard = ({ product }) => {
  const modalState = useOverlayState({
    defaultOpen: false,
  });
  // 2. Manage the form data state
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    stockQuantity: product.stockQuantity,
    category: product.category,
  });
  const handleSave = () => {
    console.log("Saving new data to API:", formData);
    // TODO: Add your API PUT/PATCH request here

    // Close modal on success
    modalState.close();
  };

  const handleDelete = (id) => {
    console.log("Deleting product:", id);
    // TODO: Add your delete API call here
  };

  return (
    <div className="group flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#111827] p-5 transition-all duration-300 hover:border-[#0A7C6E]/40 hover:shadow-[0_20px_60px_rgba(10,124,110,0.18)] md:flex-row">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-[#1A2234] md:h-40 md:w-40 md:flex-shrink-0">
        <Image
          src={product.image?.[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {product.title}
              </h2>

              <p className=" text-sm capitalize text-zinc-400">
                {product.category}
              </p>
            </div>

            <Chip
              variant="soft"
              classNames={{
                base: product.stockQuantity
                  ? "bg-[#0A7C6E]/15 border border-[#0A7C6E]/30"
                  : "bg-red-500/15 border border-red-500/30",
                content: product.stockQuantity
                  ? "text-[#30C9B4] font-medium"
                  : "text-red-400 font-medium",
              }}
            >
              {product.stockQuantity ? "Available" : "Sold Out"}
            </Chip>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-2 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Price:
            </p>

            <h3 className="text-2xl font-bold text-[#0A7C6E]">
              ৳{product.price}
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/products/${product._id}`}>
              <Button
                className="bg-[#0A7C6E] font-semibold text-white hover:bg-[#09685d]"
                size="sm"
              >
                View Details
              </Button>
            </Link>

            <Modal>
              <Button
                variant="tertiary"
                size="sm"
                className="border-white/15 text-zinc-500 bg-zinc-800"
                onPress={() => {
                  //   console.log("clicked");
                  modalState.open();
                }}
              >
                Edit
              </Button>
              <Modal.Backdrop
                isOpen={modalState.isOpen}
                onOpenChange={modalState.setOpen}
              >
                <Modal.Container placement="auto">
                  <Modal.Dialog className="sm:max-w-lg bg-zinc-900">
                    {/* Close button at the top */}
                    <Modal.CloseTrigger onPress={() => modalState.close()} />

                    <Modal.Header>
                      <Modal.Heading className=" text-xl text-zinc-300">
                        Edit Product
                      </Modal.Heading>
                      <p className="mt-1.5 text-sm leading-5 text-zinc-400">
                        Update your product details below. Make sure to hit save
                        when you are done.
                      </p>
                    </Modal.Header>

                    <Modal.Body className="p-6 bg-zinc-900">
                      <Surface variant="default">
                        <form className="flex flex-col gap-4 bg-zinc-900">
                          <TextField
                            className="w-full "
                            name="title"
                            type="text"
                            variant="secondary"
                          >
                            <Label className=" text-sm text-zinc-300">
                              Title
                            </Label>
                            <Input
                              placeholder="Product Name"
                              className={"bg-zinc-800 text-zinc-300"}
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                })
                              }
                            />
                          </TextField>

                          <TextField
                            className="w-full"
                            name="price"
                            type="number"
                            variant="secondary"
                          >
                            <Label className=" text-sm text-zinc-300">
                              Price ($)
                            </Label>
                            <Input
                              placeholder="0.00"
                              className={"bg-zinc-800 text-zinc-300"}
                              value={formData.price}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  price: Number(e.target.value),
                                })
                              }
                            />
                          </TextField>

                          <TextField
                            className="w-full"
                            name="stock"
                            type="number"
                            variant="secondary"
                          >
                            <Label className=" text-sm text-zinc-300">
                              Stock Quantity
                            </Label>
                            <Input
                              placeholder="10"
                              className={"bg-zinc-800 text-zinc-300"}
                              value={formData.stockQuantity}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  stockQuantity: Number(e.target.value),
                                })
                              }
                            />
                          </TextField>

                          <TextField
                            className="w-full"
                            name="category"
                            type="text"
                            variant="secondary"
                          >
                            <Label className=" text-sm text-zinc-300">
                              Category
                            </Label>
                            <Input
                              placeholder="Electronics, Clothing, etc."
                              className={"bg-zinc-800 text-zinc-300"}
                              value={formData.category}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  category: e.target.value,
                                })
                              }
                            />
                          </TextField>
                        </form>
                      </Surface>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button
                        variant="ghost"
                        className={"bg-zinc-500"}
                        size="sm"
                        onPress={() => modalState.close()}
                      >
                        Cancel
                      </Button>
                      <Button
                        className={"bg-[#0A7C6E]"}
                        size="sm"
                        onPress={handleSave}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>

            {/* Alert-dialogue */}
            <AlertDialog>
              <Button variant="danger-soft" size="sm">
                Delete
              </Button>

              <AlertDialog.Backdrop className="bg-black/70 backdrop-blur-sm">
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] text-white shadow-2xl">
                    <AlertDialog.CloseTrigger className="text-zinc-400 hover:text-white" />

                    <AlertDialog.Header className="items-center text-center">
                      <AlertDialog.Icon
                        status="danger"
                        className="bg-red-500/15 text-red-400"
                      />

                      <AlertDialog.Heading className="mt-4 text-xl font-semibold text-white">
                        Delete Product?
                      </AlertDialog.Heading>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        This action cannot be undone. The product will be
                        permanently removed from your marketplace.
                      </p>
                    </AlertDialog.Header>

                    <AlertDialog.Footer className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-5">
                      <Button
                        slot="close"
                        variant="bordered"
                        className="border-white/10 text-zinc-300 hover:bg-white/5"
                      >
                        Cancel
                      </Button>

                      <Button
                        slot="close"
                        variant="danger"
                        onPress={() => handleDelete(product._id)}
                      >
                        Delete Product
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          </div>
        </div>
      </div>
      {/* HeroUI Composition Modal */}
    </div>
  );
};

export default MyProductCard;
