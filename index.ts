import { Fearless } from "./src/main";

const app = new Fearless();

// Middleware global
app.use((req, res, next) => {
  console.log("Middleware global executado");
  next(); // Passa o controle para o próximo middleware ou handler
});

// Rota GET
app.get("/", (req, res) => {
  res.end("Hello World!"); // Finaliza a resposta
});

// Rota POST
app.post("/submit", (req, res) => {
  res.end("Dados submetidos!"); // Finaliza a resposta
});

// Rota com erro
app.get("/error", (req, res) => {
  try {
    throw new Error("Erro simulado");
  } catch (err) {
    res.writeStatus("500 Internal Server Error").end("Algo deu errado!"); // Finaliza a resposta com erro
  }
});

// Inicia o servidor
app.listen(9001, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Servidor rodando na porta 9001");
  }
});
