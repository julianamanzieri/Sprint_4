import { type NextFunction, type Request, type Response } from 'express';
import cacheControlMiddleware from '../../infrastructure/interfaces/middlewares/cacheControlMiddleware';

describe('Given a cacheControlMiddleware', () => {
  // Conjunto de testes para o cenário em que o middleware recebe uma req
  describe('When it receives a request,', () => {
    // Configura o cabeçalho Cache-control e chama a função next
    test("Then it should set 'Cache-control' header and call next function", () => {
      // Função fictícia do jest para o middleware next
      const next = jest.fn();
      const req = {};
      const res: Partial<Response> = {
        set: jest.fn()
      };

      // Chama o middleware de controle de cache com a req, resp e próximo fictícios
      cacheControlMiddleware(
        req as Request,
        res as Response,
        next as NextFunction
      );

      // Afirma que o método set do objeto de resposta foi chamado com os parâmetros corretos
      expect(res.set).toHaveBeenCalledWith('Cache-Control', 'no-cache');
      // Afirma que a função next foi chamada
      expect(next).toHaveBeenCalled();
    });
  });
});
