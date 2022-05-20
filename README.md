# 都道府県別の総人口推移グラフ

選択された都道府県別の総人口推移グラフを表示します。

[![code check](https://github.com/ygkn/population-chart/actions/workflows/code-check.yml/badge.svg)](https://github.com/ygkn/population-chart/actions/workflows/code-check.yml) [![deploy](https://github.com/ygkn/population-chart/actions/workflows/deploy.yml/badge.svg)](https://github.com/ygkn/population-chart/actions/workflows/deploy.yml)

## 開発

### 事前要件

- 必要なソフトウェア
  - **Node.js** - 16.x
  - **Yarn** - 1.x
- [RESAS-API](https://opendata.resas-portal.go.jp/) の利用登録を行い、API キーを取得する

### クイックスタート

1. このリポジトリを clone する
2. `.env.local.example` ファイルを `.env.local` ファイル ( Git では無視される) としてコピーし、`ENTER_YOUR_RESAS_API_KEY_HERE` を RESAS-API キーに書き換える
3. `yarn install` を実行し、依存パッケージをインストールする
4. `yarn dev` を実行し、開発サーバーを起動する

### Wiki

詳細は [Wiki](https://github.com/ygkn/population-chart/wiki) をご覧ください。
