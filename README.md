# jpost-digiaddr

日本郵便の郵便番号・デジタルアドレスAPIクライアント

本リポジトリは、日本郵便株式会社が提供する郵便番号・デジタルアドレスAPIのクライアントライブラリです。OpenAPI仕様から自動生成された型安全なクライアントを提供します。

## 特徴

- OpenAPI仕様から自動生成
- 型安全なAPI呼び出し

## セットアップ

### 前提

郵便番号・デジタルアドレスAPIにアクセスするには、郵便番号・デジタルアドレス for Bizでシステム登録を行い、クライアントIDとクライアントシークレットを取得する必要があります。詳しくは[公式ドキュメント](https://guide-biz.da.pf.japanpost.jp/api/)を確認してください。

### インストール

```shell
# Deno
deno add jsr:@fuji44/jpost-digiaddr

# Node.js
npx jsr add @fuji44/jpost-digiaddr
```

## 使い方

```typescript
import {
  BaseBearerTokenAuthenticationProvider,
  createJPostDigiAddrClient,
  FetchRequestAdapter,
  JPostDigiAddrAccessTokenProvider,
} from "@fuji44/jpost-digiaddr";

const provider = new BaseBearerTokenAuthenticationProvider(
  new JPostDigiAddrAccessTokenProvider(
    "your-client-id",
    "your-client-secret",
  ),
);
const adapter = new FetchRequestAdapter(provider);
const client = createJPostDigiAddrClient(adapter);
const resp = await client.api.v1.searchcode.bySearch_code("A7E2FK2").get({
  queryParameters: { page: 1, limit: 10 },
});

console.log(JSON.stringify(resp));
// {"page":1,"limit":10,"count":1,"searchtype":"dgacode","addresses":[{"dgacode":"A7E2FK2","zipCode":"100-0005","prefCode":"13","prefName":"東京都","cityCode":"13101","cityName":"千代田区","townName":"丸の内","blockName":"２丁目７−２","otherName":"部屋番号：サンプル１","address":"東京都千代田区丸の内２丁目７−２部屋番号：サンプル１"}]}
```

## テスト

テストを実行するクライアントID・シークレットが必要です。郵便番号・デジタルアドレス for Bizのサイトからテスト用のクライアントID・シークレットを確認して、プロジェクトルートに `.env` を作成し、以下のように記載してください。

```ini
JPOST_DIGIADDR_CLIENT_ID=your_client_id_here
JPOST_DIGIADDR_CLIENT_SECRET=your_client_secret_here
```

```shell
deno task test
```

## コード生成

OpenAPI仕様からクライアントコードを自動生成します。

```shell
deno task generate
# 事前クリーンアップ
# deno task generate:preclean
```

## ライセンス

MIT License

## 参考

- [デジタルアドレス | 日本郵便株式会社](https://lp.da.pf.japanpost.jp)
- [郵便番号・デジタルアドレスAPI | 日本郵便株式会社](https://guide-biz.da.pf.japanpost.jp/api/)
- [OpenAPI Specification - 本番用](https://biz.da.pf.japanpost.jp/apireference/digiadd-swagger-biz.html)
- [OpenAPI Specification - テスト用](https://biz.da.pf.japanpost.jp/apireference/digiadd-mock-swagger-biz.html)
