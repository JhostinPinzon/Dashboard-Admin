import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const [totalVentas, totalPedidos, totalUsuarios, totalProductos] = await Promise.all([
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'CLIENT' } }),
      prisma.product.count()
    ]);

    // Mock sales data for the chart (could be aggregated from orders)
    const salesData = [
      { name: 'Mayo', value: 1200000 },
      { name: 'Jun', value: 2100000 },
      { name: 'Jul', value: 1800000 },
      { name: 'Ago', value: 3500000 },
      { name: 'Sep', value: 2800000 },
      { name: 'Oct', value: totalVentas._sum.total || 0 },
    ];

    const orderStatusCounts = await prisma.order.groupBy({
      by: ['status'],
      _count: true
    });

    res.json({
      metrics: {
        totalVentas: totalVentas._sum.total || 0,
        totalPedidos,
        totalUsuarios,
        totalProductos
      },
      salesData,
      orderStatusCounts
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener métricas' });
  }
};
