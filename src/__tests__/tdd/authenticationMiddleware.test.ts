import { type NextFunction, type Request, type Response } from 'express';
import authenticationMiddleware from '../../infrastructure/interfaces/middlewares/authenticationMiddleware';

describe('Given a authenticationMiddleware', () => {
  // Função ficticia do jest para o Middleware
  const next = jest.fn();

  // Conjunto de testes para um cenario especifico
  describe('When it receives an authorization header with a non-valid user or password,', () => {
    // Credenciais de usuarios ficticios e um objeto de requisição ficiticio
    const mockUser = 'juliana';
    const mockPassword = '1234';
    const req = {
      headers: {
        authorization: `Basic ${Buffer.from(
          `${mockUser}:${mockPassword}`
        ).toString('base64')}`
      }
    };

    // Mock parcial para o objeto de resposta
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    // Verifica se a função de status da resposta é chamada com um codigo 401
    test('Then it should call the response status function with a 401', () => {
      const expectedStatus = 401;

      // Chama o Middleware de autenticação com a req, res e proximo ficticio
      authenticationMiddleware(
        req as Request,
        res as Response,
        next as NextFunction
      );

      // Afirma que a função de status da res foi chamada com codigo esperado
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    // Verifica se a função de envio da res é chamada com Unauthorized
    test("Then it should call the response send function with the message 'Unauthorized'", () => {
      const expectedMessage = 'Unauthorized';

      // Chama o Middleware com a req, res e proximo ficticio
      authenticationMiddleware(
        req as Request,
        res as Response,
        next as NextFunction
      );

      // Afirma que a função de nevio da res foi chamada com a msg esperada
      expect(res.send).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
