# jukukuru
- 学習塾　来塾管理アプリケーション

## React Sample App
- dockerやReactになれていこうの試み

## React アプリの構築
```
sh build-react.sh
```
- パッケージを追加したい場合，build-react.sh 内に以下のように書く（絶対もっと良いやり方ある）
```
docker-compose run --rm app sh -c "npm install react-router-dom"
```

## Dockerコンテナの起動
```
sh up.sh
```

## Dockerコンテナ・イメージ・ボリュームなど全消し
```
docker-compose down --rmi all --volumes --remove-orphans
```

## VSCode で変更を保存できるようにする手順（初回のみ）
1. sudo chown eijitoriki:eijitoriki <folder name>
2. VSCodeを立ち上げ，左下にある緑のアイテムをクリックし，"ReOpen in Container" を選択
3. 何個か候補が出てくるので，"From a predefined container configuration definition" を選択
4. どのコンテナを使用するか聞かれるので，軽量な "alpine" を選択
5. プロジェクト直下に，".devcontainer" というディレクトリが作られる．"devcontainer.json" の "user" をデフォルトの "vscode" から "root" に変更する
6. 左下にある緑のアイテムから "Rebuild Container" を選択して完了