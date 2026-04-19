import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const formattedProducts = products.map(p => ({
      ...p,
      lowStock: p.stock < 10,
      color: ['Negro Phantom', 'Blanco Ártico', 'Gris Carbón', 'Azul Navy'][Math.floor(Math.random() * 4)]
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id }
    });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;
    const product = await prisma.product.create({
      data: { 
        name, 
        description: description || '', 
        price: parseFloat(price.toString()) || 0, 
        stock: parseInt(stock.toString()) || 0, 
        category: category || 'General', 
        imageUrl: imageUrl || '' 
      }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { 
        name, 
        description: description || '', 
        price: parseFloat(price.toString()) || 0, 
        stock: parseInt(stock.toString()) || 0, 
        category: category || 'General', 
        imageUrl: imageUrl || '' 
      }
    });
    res.json(product);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
