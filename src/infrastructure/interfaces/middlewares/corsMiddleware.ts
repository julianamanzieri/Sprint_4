import { NextFunction, Request, Response } from 'express';

const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Configurações CORS básicas, permitindo solicitações de qualquer origem
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

export default corsMiddleware;
