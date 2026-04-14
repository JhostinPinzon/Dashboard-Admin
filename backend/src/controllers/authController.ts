import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/auth';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password requeridos.' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, role: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = generateToken({
      id: user.id,
      email,
      role: user.role
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en servidor' });
  }
};

