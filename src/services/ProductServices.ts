import Product from "../models/Product";

export const getProductByIdService = async (id: string) => {
  return await Product.findById(id);
};

export const getAllProductService = async () => {
  return await Product.find();
};

export const createProductService = async (name: string, price: string, quantity: string, image: any) => {
  const product = new Product({
    name,
    price,
    quantity,
    imageUrl: `/uploads/${image.filename}`,
  });

  return await product.save();
};

export const deleteProductByIdService = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const updateProductByIdService = async (id: string, name: string, price: string, quantity: string, image?: any) => {
  if (image === undefined) {
    return await Product.findByIdAndUpdate(id, { name, price, quantity, imageUrl: "" });
  }
  return await Product.findByIdAndUpdate(id, { name, price, quantity, imageUrl: `/uploads/${image.filename}` });
};
