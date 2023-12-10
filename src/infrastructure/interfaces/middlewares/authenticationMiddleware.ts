import { NextFunction, Request, Response } from 'express';

// Declara a função que age como um middleware que aceita 3 parametros
const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Obtem as credenciais do usuario e senha e o cabeçalho de autorização da solicitação HTTP
  const user = process.env.USER!;
  const key = process.env.PASSWORD!;
  const authHeader = req.headers.authorization;
  console.log('authenticationMiddleware .env', user, key);

  // Verifica se existe um cabeçalho e divide a autorização em duas partes e decodifica as credenciais e as divide em nome de usuario e senha
  if (authHeader) {
    const [type, credentials] = authHeader.split(' ');

    if (type === 'Basic') {
      const [username, password] = Buffer.from(credentials, 'base64')
        .toString('utf-8')
        .split(':');
      console.log('authenticationMiddleware if', user, key);

      if (username === user && password === key) {
        next();

        return;
      }
    }
  }

  // Se as credenciais não são validas envia uma resposta HTTP
  res.status(401).send('Unauthorized');
};

export default authenticationMiddleware;
