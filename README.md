# jukukuru
- 学習塾　来塾管理アプリケーション

## React Sample App
- dockerやReactになれていこうの試み


## Dockerコンテナのビルド & 起動
```
sh up.sh
```

## Dockerコンテナ・イメージ・ボリュームなど全消し
```
docker-compose down --rmi all --volumes --remove-orphans
```

## DB 関係のあれこれ
### MySQL の IPアドレスの確認
- server/app/config.py の9行目を変える必要がある
- IPアドレスを確認するコマンド
```
docker ps
docker inspect <mysql_container_id> | grep IPAddress
```

### DB のマイグレーション
```
docker exec -it <python_container_id> bash
flask db init
flask db migrate
flask db upgrade
```

### MySQL でのテーブル存在確認
```
mysql -u root -p
SHOW DATABASES;
use <database_name>;
show tables;
```

## VSCode で変更を保存できるようにする手順（初回のみ）
1. sudo chown eijitoriki:eijitoriki <folder name>
2. VSCodeを立ち上げ，左下にある緑のアイテムをクリックし，"ReOpen in Container" を選択
3. 何個か候補が出てくるので，"From a predefined container configuration definition" を選択
4. どのコンテナを使用するか聞かれるので，軽量な "alpine" を選択
5. プロジェクト直下に，".devcontainer" というディレクトリが作られる．"devcontainer.json" の "user" をデフォルトの "vscode" から "root" に変更する
6. 左下にある緑のアイテムから "Rebuild Container" を選択して完了