import { RequestHandler } from "express";
import { createProductService, getAllProductService, getProductByIdService } from "../services/ProductServices";
import Product from "../models/Product";

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const allProducts = await getAllProductService();

    return res.json(allProducts);
  } catch (error) {}
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    return res.json(product);
  } catch (error) {}
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).send("Nenhuma imagem foi enviada.");
    }

    const newProduct = await createProductService(name, price, quantity, image);

    res.status(201).json(newProduct);
  } catch (error) {}
};

export const updateProduct: RequestHandler = async (req, res) => {
  res.json({ message: "OK" });
};

export const deleteProductById: RequestHandler = async (req, res) => {
  res.json({ message: "OK" });
};
