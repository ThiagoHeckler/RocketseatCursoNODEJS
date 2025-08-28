import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

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
const database = new Database();
const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");
    return res.end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);
    return res.writeHead(201).end();
  }
  return res.writeHead(404).end();
});

server.listen(3333);
//localhost:3333
