## コマンドとその説明

**データベース一覧を見る**
```sql
show databases;
```

**データベースを新しく作成する**
```sql
create database (db_name);
```

**データベースを選択する**
```sql
use (db_name);
```

**テーブルを作成する**
```sql
create table (table_name) (id ○○, name ○○);
```
`今回のテーブル`
```sql
create table books( 
  id BINARY(16), 
  title CHAR(150) NOT NULL, 
  auther CHAR(100) NOT NULL, 
  description VARCHAR(2000) NOT NULL DEFAULT '', 
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (id) 
);

create table chapter(
   id INT AUTO_INCREMENT, 
   books_id INT NOT NULL, 
   name CHAR(150) NOT NULL, 
   content TEXT, 
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
   PRIMARY KEY (id), 
   FOREIGN KEY (books_id) REFERENCES books(id) 
);
```

**テーブル構造を表示する**
```sql
describe (table_name);
```

**カラム定義を変更する**
```sql
alter table (table_name) modify col_name column_definition;
```

`使用例`

```sql
alter table books modify title char(70) not null;
```

- tableを必須項目に修正

**カラムを追加**
```sql
alter table (table_name) add column (col_name) (data_type);
```
`使用例`

```sql
alter table (table_name) add column (col_name) (data_type);
```

**カラムを削除**
```sql
alter table (table_name) drop column (col_name);
```

**インデックスを作成**
```sql
create index (idx_name) on (table_name)((column_name));
```

**データを挿入**
```sql
insert into (table_name) (col_name,col_name) values
  ('value', value);
```

**uuidをbinery16に変換して格納**
```sql
 insert into (table_name) (id) values (UUID_TO_BIN('(uuid)'));
```

**文字列中の特定の文字を除去**
```sql
 replace(books_id, '-', '') as id
```

### CHARとVARCHAR、BINARYとVARBINARYの違い

### 文字列を扱うデータの扱い

## ユニークキーについて

カラムにUNIQUE制約を付けることでカラムに重複した値を入れれなくなる

書式
```sql
ALTER TABLE (table_name)
ADD CONSTRAINT (idx_name) UNIQUE (column_name);
```
### 複合のカラムにユニーク制約を付ける

複数のカラムにユニーク制約を付けることができる

例:book_idとchapter_numにunique制約を付けると、同じ本だと同じチャプター番号が付かないようになります。

書式
```sql
ALTER TABLE (table_name)
ADD CONSTRAINT (idx_name) UNIQUE (column_name, column_name);
```

なお、これらの制約がついているカラムはインデックスがかかる

#### 制約の削除方法

書式
```sql
ALTER TABLE (table_name)
DROP INDEX (idx_name);
```

## クエリ効率の調べ方