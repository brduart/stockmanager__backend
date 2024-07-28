import { RequestHandler } from "express";
import { createProductService, deleteProductByIdService, getAllProductService, getProductByIdService, updateProductByIdService } from "../services/ProductServices";
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

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

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
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  let image = req.file;

  try {
    const updatedProduct = await updateProductByIdService(id, name, price, quantity, image);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Não foi possível editar o produto" });
  }
};

export const deleteProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await deleteProductByIdService(id);

    res.status(200).json({ message: "Produto deletado", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel excluir o produto." });
  }
};
