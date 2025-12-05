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