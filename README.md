# Better Auth Demo

ローカルで Better Auth を試すための最小構成です。メール + パスワード認証をメモリ DB で動かします。

## セットアップ
- 依存関係をインストール
  ```bash
  npm install
  ```
- 開発サーバを起動
  ```bash
  npm run dev
  ```
  デフォルトで `http://localhost:3000` を待ち受け、`/api/auth` 配下にエンドポイントを公開します。

> サンドボックスなど、ポートを開けない環境では下記のハンドラ直叩きスクリプトで動作確認できます。

## API を試す

- 新規登録
  ```bash
  curl -X POST http://localhost:3000/api/auth/sign-up/email \
    -H "Content-Type: application/json" \
    -d '{"name":"Demo","email":"demo@example.com","password":"Passw0rd!"}' -i
  ```
- サインイン
  ```bash
  curl -X POST http://localhost:3000/api/auth/sign-in/email \
    -H "Content-Type: application/json" \
    -d '{"email":"demo@example.com","password":"Passw0rd!"}' -i
  ```

レスポンスの `set-cookie` ヘッダーに Better Auth のセッショントークンが付きます。

## ビルド & 本番起動

```bash
npm run build
npm start
```

## 付録: ハンドラを直接呼ぶデモ

下記コマンドで、HTTP サーバを立てずに Better Auth の `Request` ハンドラを直接叩いて挙動を確認できます。

```bash
node scripts/demo-call.mjs
```

内容は `scripts/demo-call.mjs` を参照してください。
