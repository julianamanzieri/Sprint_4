// para iniciar o serrvidor
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './infrastructure/interfaces/routes/taskRoutes';
import cacheControlMiddleware from './infrastructure/interfaces/middlewares/cacheControlMiddleware';
import authenticationMiddleware from './infrastructure/interfaces/middlewares/authenticationMiddleware';

// Para ler arquivo .env
dotenv.config();
// Cria uma instancia do aplicativo Express chamada app
const app = express();

// Define a variável para ser o número da porta especificado
const port = 3000;

// Configura o middleware express.json() para permitir o uso de JSON no corpo das requisições
app.use(express.json());
// Usa os middlewares no aplicativo e serão executados para todas as rotas configuradas posteriormente
app.use(cors());
app.use(cacheControlMiddleware);
app.use(authenticationMiddleware);

// Configura as rotas definidas no arquivo taskRoutes para que estejam disponíveis no caminho /tasks
app.use('/tasks', taskRoutes);

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
