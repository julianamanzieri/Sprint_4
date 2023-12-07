import { Request, Response, NextFunction } from 'express';
import corsMiddleware from '../../infrastructure/interfaces/middlewares/corsMiddleware';

describe('Given a corsMiddleware', () => {
  // Função fictícia do Jest para o próximo middleware
  const next = jest.fn();

  // Mock parcial para o objeto de resposta
  const res: Partial<Response> = {
    header: jest.fn(),
    status: jest.fn(),
    end: jest.fn()
  };

  // Conjunto de testes para verificar as configurações CORS
  describe('When it receives a request,', () => {
    test('Then it should set the CORS headers correctly', () => {
      // Objeto de requisição fictício
      const req: Partial<Request> = {
        method: 'GET'
      };

      // Chama o middleware com a req, res e próximo fictício
      corsMiddleware(req as Request, res as Response, next as NextFunction);

      // Afirma que o método header do objeto de resposta foi chamado com os parâmetros corretos
      expect(res.header).toHaveBeenCalledWith(
        'Access-Control-Allow-Origin',
        '*'
      );
      expect(res.header).toHaveBeenCalledWith(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      expect(res.header).toHaveBeenCalledWith(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE'
      );
    });
  });

  // Conjunto de testes para verificar o passagem para o próximo middleware
  describe('When it receives a non-preflight request (other methods),', () => {
    test('Then it should call the next middleware without modifying the response', () => {
      // Objeto de requisição fictício para outros métodos (não OPTIONS)
      const req: Partial<Request> = {
        method: 'GET'
      };

      // Chama o middleware com a req, res e próximo fictício
      corsMiddleware(req as Request, res as Response, next as NextFunction);

      // Afirma que o próximo middleware foi chamado
      expect(next).toHaveBeenCalled();
    });
  });
});
