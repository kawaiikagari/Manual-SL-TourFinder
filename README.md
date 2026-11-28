# SL Tour Finder — 取扱説明書 / User Guide

公開URL：<https://kawaiikagari.github.io/Manual-SL-TourFinder/>

ルートのindex.html自体に本文を配置しているため、/docs/や/Docs/へ転送しません。日本語・Englishは同じページ内のLanguage / 言語で切り替えます。内容は左から配置し、左右の余白は16〜32px程度です。

正本はSL-TourFinder/docsです。取説HTML・CSS・JSと運用手順Markdownだけを、このリポジトリの小文字docsへコピーします。アプリソース・DBデータ・認証設定やセキュリティレビュー報告はコピーしません。

ルートindex.htmlは正本docs/index.htmlと同じ本文で、CSSとJSの参照先だけdocs/を付けています。正本を更新してからコピー・入口の再生成を行います。Pagesの公開元がmain /docsでもmain /(root)でも本文を表示できます。双方の公開元へ.nojekyllを配置します。

アプリ側に設定する取説URLは1つです。言語別URLの登録は不要です。
