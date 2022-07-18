# jukukuru
- 学習塾　来塾管理アプリケーション

## React Sample App
- dockerやReactになれていこうの試み


## Dockerコンテナのビルド & 起動
```
sh build.sh
sh up.sh
```

## Dockerコンテナ・イメージ・ボリュームなど全消し
```
docker-compose down --rmi all --volumes --remove-orphans
```

## frontendのコンテナ内に入る
```
docker ps
docker exec -it <frontend_container_id> /bin/sh
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

## ジュククルDB設計
### 日程表
#### 日付に対応する開講コマを格納する
- dateID : Integer (主キー)
  - その日付のID
- date : varchar(10)
  - M月D日 のような形式で格納する
- dow : varchar(1)
  - 曜日を格納する
  - dow は，「曜日」を表す "day of week" の略
- komaN : boolean
 - Nコマ目が空いているか否か
 - N = {1,2,3,4,5,6,7}
- komaNTime : varchar(12)
  - Nコマ目の時間帯
  - HH:MM~HH:MM の形で格納
  - N = {1,2,3,4,5,6,7}

### 生徒表(students table)
#### 生徒情報を格納する
- studentID : Integer (主キー)
  - その生徒を識別するID
- name : varchar(10)
  - 生徒名
- grade : Integer
  - 学年
  - 4: 小学4年生
  - 5: 小学5年生
  - 6: 小学6年生
  - 1: 中学1年生
  - 2: 中学2年生
  - 3: 中学3年生

### 来塾表
#### 生徒が来るコマを記録する
- dateID : Integer (主キー)
  - 日程表の dateID
- studuentID : Integer (主キー)
  - 生徒表の studuentID
- isComeKomaN : boolean
  - その日に，その生徒がNコマ目に来るかどうか
  - N = {1,2,3,4,5,6,7}

## VSCode で変更を保存できるようにする手順（初回のみ）
1. sudo chown eijitoriki:eijitoriki <folder name>
2. VSCodeを立ち上げ，左下にある緑のアイテムをクリックし，"ReOpen in Container" を選択
3. 何個か候補が出てくるので，"From a predefined container configuration definition" を選択
4. どのコンテナを使用するか聞かれるので，軽量な "alpine" を選択
5. プロジェクト直下に，".devcontainer" というディレクトリが作られる．"devcontainer.json" の "user" をデフォルトの "vscode" から "root" に変更する
6. 左下にある緑のアイテムから "Rebuild Container" を選択して完了