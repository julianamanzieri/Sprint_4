import { NextFunction, Request, Response } from 'express';

// Declara a função que age como middleware que aceita 3 parametros
const CacheControlMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // DDefine o cabeçalho Cache-Control na resposta como no-cache einstrui os caches a não armazenar em cache a resposta
  res.set('Cache-Control', 'no-cache');

  // Chama a função next para passar para o proximo middleware da pilha
  next();
};

export default CacheControlMiddleware;
