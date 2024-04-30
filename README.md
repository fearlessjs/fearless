# Fearless

![Fearless Logo](insert_logo_url_here)

Fearless é um microframework incrível para desenvolvimento web, projetado para tornar sua vida como desenvolvedor mais fácil e produtiva. Com um foco na simplicidade, desempenho e flexibilidade, Fearless permite que você crie aplicativos web rapidamente, sem sacrificar a velocidade ou a qualidade.

## 🚀 Por que usar o Fearless?

- **Simplicidade e Rapidez**: Fearless oferece uma instalação rápida e simples, permitindo que você comece a desenvolver rapidamente, sem configuração complicada.
- **Alto Desempenho**: Desenvolvido com uWS (C++), Fearless proporciona um desempenho excepcional para suas aplicações web.
- **Pluggable e Extensível**: Com suporte a middlewares, você pode estender e personalizar facilmente o comportamento do seu aplicativo.
- **Suporte Total a TypeScript**: Desfrute de uma experiência de desenvolvimento mais segura e eficiente com suporte completo para definições de tipos TypeScript.

## 🎩 Features

- **Instalação Rápida**: Pequeno em tamanho e rápido para instalar.
- **Zero Configuração e Simplicidade**: Projetado para começar a usar imediatamente.
- **Alta Velocidade de Execução**: Suporte a uWS(C++) para um desempenho excepcional.
- **Extensibilidade**: Personalize seu aplicativo com middlewares.
- **Suporte Completo a TypeScript**: Desenvolva com confiança com tipagem estática.

## 🛠️ Instalação

Fearless pode ser facilmente instalado via npm, yarn ou pnpm:

```bash
npm install @fearlessjs/fearless
```

ou

```bash
yarn add @fearlessjs/fearless
```

ou

```bash
pnpm add @fearlessjs/fearless
```

## 💻 Uso

Aqui está um exemplo simples de como começar a usar o Fearless em seu projeto:

```typescript
import { Fearless } from "@fearlessjs/fearless";
import type { FRequest, FResponse } from "@fearlessjs/fearless";

const app = new Fearless();

// Exemplo de uso de middleware para query string
export const queryString = () => {
  return (req) => {
    const query = req.getQuery();

    req.query = query.split("&").reduce((acc, cur: string) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {}) as Record<string, string>;
  };
};

app.use(queryString());

app.get("/", (req: FRequest, res: FResponse) => {
  res.status(200).send("Hello World from Fearless!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## 📖 Documentação

- [Como fazer um GET](#como-fazer-um-get)
- [Como fazer um POST](#como-fazer-um-post)
- [Como adicionar middlewares](#como-adicionar-middlewares)
- [Como criar um middleware customizado](#como-criar-um-middleware-customizado)
- [Retorno em JSON](#retorno-em-json)

### Como fazer um GET

Para definir uma rota GET, utilize o método `get` do objeto Fearless, passando o caminho da rota e um manipulador de requisição.

Exemplo:

```typescript
app.get("/", (req: FRequest, res: FResponse) => {
  res.status(200).send("Hello World!");
});
```

### Como fazer um POST

Para definir uma rota POST, utilize o método `post` do objeto Fearless, passando o caminho da rota e um manipulador de requisição.

Exemplo:

```typescript
app.post("/submit", (req: FRequest, res: FResponse) => {
  res.status(200).send("Data submitted!");
});
```

### Como adicionar middlewares

Para adicionar um middleware, utilize o método `use` do objeto Fearless, passando o middleware como argumento.

Exemplo:

```typescript
// Exemplo de uso de middleware para query string
export const queryString = () => {
  return (req) => {
    const query = req.getQuery();

    req.query = query.split("&").reduce((acc, cur: string) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {}) as Record<string, string>;
  };
};

app.use(queryString());
```

### Como criar um middleware customizado

Você pode criar middlewares customizados para adicionar funcionalidades específicas ao seu aplicativo. Um middleware é uma função que recebe os objetos de requisição e resposta, e o próximo middleware na cadeia, e executa alguma lógica antes de chamar o próximo middleware.

Exemplo:

```typescript
const customMiddleware = (req: FRequest, res: FResponse, next: Function) => {
  // Executar alguma lógica aqui
  next(); // Chamar o próximo middleware
};

app.use(customMiddleware);
```

### Retorno em JSON

Para retornar dados em formato JSON, utilize o método `send` do objeto de resposta passando o objeto a ser enviado.

Exemplo:

```typescript
app.get("/user", (req: FRequest, res: FResponse) => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };
  
  res.status(200).send(user);
});
```

## 📝 Licença

Fearless é licenciado sob a [Licença MIT](./LICENSE).

## 🤝 Contribuindo

Contribuições, problemas e solicitações de novos recursos são bem-vindos! Consulte nosso guia de contribuição para obter mais informações.
