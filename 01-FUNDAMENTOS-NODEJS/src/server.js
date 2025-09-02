import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";


// UUID => Unique Universal ID

// - Criar usário
// - Listagem usários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//    - Método HTTP
//    - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful (aplicação depende da memória) - Stateless (aplicação não depende da memória (salva em banco de dados ou outro tipo de salvamento))

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisições/respostas) => Metadados

// HTTP Status Codes
// 100 - 199 => Informational responses
// 200 - 299 => Success
// 300 - 399 => Redirection
// 400 - 499 => Client errors
// 500 - 599 => Server errors


// Query Parameters: URL Statefull => Filtros, paginacao, nao obrigatorios
// Route Parameters: Identificacao de recurso
// Request Body: Envio de informacoes de um formaulario (HTTPs) (de quantas informacoes eu quiser)

// http://localhost:3333/users?userId=1&name=Thiago

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333/users

// Edicao e remocao

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })
  if (route) {
    return route.handler(req,res);
  }
  return res.writeHead(404).end();
});

server.listen(3333);
//localhost:3333
