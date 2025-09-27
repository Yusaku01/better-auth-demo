import http from "http";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth";

const authHandler = toNodeHandler(auth);
const PORT = Number(process.env.PORT ?? 3000);

const instructions = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Better Auth Demo</title>
    <style>
      body { font-family: sans-serif; margin: 2rem; }
      code { background: #f5f5f5; padding: 0.25rem 0.4rem; border-radius: 4px; }
      pre { background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    </style>
  </head>
  <body>
    <h1>Better Auth ローカル検証サーバ</h1>
    <p>メール+パスワードのサインアップ/サインイン API を <code>/api/auth</code> 配下で提供します。</p>
    <p>例: 新規ユーザ登録</p>
    <pre><code>curl -X POST http://localhost:${PORT}/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo","email":"demo@example.com","password":"Passw0rd!"}' -i</code></pre>
    <p>サインイン</p>
    <pre><code>curl -X POST http://localhost:${PORT}/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"Passw0rd!"}' -i</code></pre>
    <p>成功するとレスポンスヘッダーの <code>set-cookie</code> にセッションが付与されます。</p>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Bad Request");
    return;
  }

  if (req.url.startsWith("/api/auth")) {
    authHandler(req, res);
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(instructions);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`Better Auth demo server running at http://localhost:${PORT}`);
});
