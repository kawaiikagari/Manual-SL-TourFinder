# 検索JSONのGoogle Drive管理

2026-11-28。ローカル実装です。Google上の変更・実保存は未確認です。

## Googleへの反映（所有者）

1. Main.gsとHTML Indexを更新。DiscoveryWorker.htmlは既存版を使用します。
2. Google上の既存マニフェストappsscript.jsonのoauthScopes配列に、https://www.googleapis.com/auth/drive がなければ追加します。他のスコープ・実行者・アクセス設定を保持してください。
3. 所有者がIDEでgetSearchJSONConfigを実行し、追加権限の承認を確認します。既存デプロイを新しい版へ更新します。Googleログイン用のOAuthクライアント設定JSONの再登録は不要です。
4. Drive API無効と表示された場合だけ、このApps Scriptに既に紐付いたCloudプロジェクトでGoogle Drive APIを有効化します。Cloudプロジェクトの作り直し・紐付け変更はしません。
5. 実スタッフで保存先登録→保存→一覧→読込を確認。DB初期化・列追加は不要です。

## 保存先と共同作業

写真とは別のスタッフ共有フォルダーをおすすめします。実行所有者が読み書きでき、アクセス者本人または指定グループssj-sl-data-manager@googlegroups.comに編集共有されたフォルダーを使います。共有は運用担当者がDriveで設定します。アプリは共有を変更せず、公開・ドメイン共有や所有者だけのアクセス権をスタッフの許可にしません。

「検索設定 → 保存・再開 → 検索JSONの管理」または「設定 → 検索JSONの管理 → 開く」。専用ポップアップの保存先タブでURLを登録します。設定は確認済みアクセス者IDごとのScript Propertiesへ保存し、変更前後を既存の確認履歴へ記録します。同じフォルダーURLを各利用者が指定できます。

保存済みタブで新規JSONへ保存します。既定名はSL-Tour-Finder-Linden-search-YYYY-MM-DD_HH-mm-ss_JST.json。保存内容を読み直して確認し、同じ保存要求の再試行は重複作成を防ぎます。一覧は30件ずつ取得し、名前・保存者・JST日時・サイズを表示。本文は明示的な読込時に取得します。

他スタッフの検索も同じDB・共有フォルダーから選択できます。対象名と置き換え確認にチェックして読み込みます。受け取り側の本人IDへ検索状態を関連付け、再検索・DB登録は行いません。形式・DB・保存者の識別・ファイルの版・内容の一致を確認し、不正・変更済みのデータを現在の検索へ適用しません。

Drive保存・読込上限4 MiB。PCファイルタブのダウンロード・読込は引き続き使えます。手動読込は64 MiB、同じ利用者・DBに限定します。共同引き継ぎはDrive一覧から行ってください。

検索条件・公開取得結果・選択・表示状態・続きの位置が対象です。候補DB・実施／確認履歴・写真・名簿・未保存メモ・認証情報は含めません。ブラウザーの自動保存失敗とJSON読込成功を区別します。プレビューはDriveに接続しません。

技術資料：[Driveファイルのプロパティ](https://developers.google.com/workspace/drive/api/guides/properties)、[アップロード](https://developers.google.com/workspace/drive/api/guides/manage-uploads)。
