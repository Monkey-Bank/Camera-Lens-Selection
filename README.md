# ■ Camera Lens Selection

![preview1](./public/lens.webp)

---

## ■ はじめに

視覚的に「F 値」と「焦点距離」の関係性が体感できるカメラシミュレーションアプリです。

---

## ■ アプリを作ったキッカケ

カメラ初心者にとって、**レンズ選びは非常に難しい問題**です。  
本アプリは、**焦点距離（mm）と F 値の違いが被写界深度やズームにどう影響するか**を視覚的に理解できるように設計されています。

**カメラが好きな制作者自身が、初心者の頃に「こういうアプリが欲しかった！」と思って開発しました。**  
カメラ・レンズ選びの参考になれば嬉しいです。

---

## ■ 使用技術・ライブラリ

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS 4**
- **Firebase**
  - Authentication
  - Firestore Database
  - Hosting
- **React Router DOM v7**
- **React Firebase Hooks**
- **React Toastify**（通知用）

---

## ■ 機能概要

| 機能                      | 説明                                                          |
| ------------------------- | ------------------------------------------------------------- |
| 📸 カメラシミュレーション | 焦点距離と F 値のスライダーで背景のボケと被写体の拡大率が変化 |
| ⭐ お気に入り登録         | 気になる設定を Firebase に保存                                |
| 🧑 ユーザー認証           | Firebase Authentication でログイン管理                        |
| 🧾 マイページ             | お気に入り設定の一覧＆削除が可能                              |
| 🔍 レンズ検索　　　　　   | 気になるレンズを選択して、Web で検索　　　　　　　　　　　　  |

---

## ■ 画面イメージ

![preview1](./public/screenshot1.png)
![preview2](./public/screenshot2.png)

---

## ■ 今後のアップデート

- レンズ検索 | 条件に合う市販レンズを検索（楽天・Amazon API 対応予定）
- レンズソート機能 | 価格順や焦点距離順など
- お気に入り登録からワンクリックで検索

---

## ■ リンク先

[Camera Lens Selection](https://camera-lens-selection.web.app/)

---
