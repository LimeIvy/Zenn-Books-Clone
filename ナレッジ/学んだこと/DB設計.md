## DBテーブル・カラム名の命名規則について

### 命名規則の良い例と悪い例

| 対象 | 説明 | 良い例 (Good) | 悪い例 (Bad) |
| :--- | :--- | :--- | :--- |
| **全体** | **英語の小文字 + スネークケース** | `user_name`, `order_details` | `userName`, `UserName`, `ユーザー名` |
| **テーブル名** | **複数形**にする | `users`, `products` | `user`, `tbl_users` |
| **カラム名** | **単数形**にする | `email`, `title` | `emails`, `product_title` |
| **主キー (PK)** | **シンプルに** `id` とする | `id` | `user_id`, `pk_id` |
| **外部キー (FK)** | **`{参照先テーブル単数形}_id`** | `user_id` | `users_id`, `fk_user` |
| **日時** | 接尾辞に **`_at`** を付ける | `created_at`, `updated_at` | `create_date`, `update_time` |
| **日付** | 接尾辞に **`_on`** を付ける | `published_on`, `sent_on` | `publish_date`, `send_day` |
| **真偽値 (Boolean)** | 接頭辞 **`is_`, `has_`, `can_`** | `is_active`, `has_license` | `active`, `flag` |
| **種類 / 区分** | 接尾辞 **`_type`, `_category`** | `user_type`, `product_category` | `type`, `category` |
| **状態 / ステータス** | 接尾辞 **`_status`** | `payment_status`, `shipping_status` | `status`, `state` |

---

## ❌ やってはいけない命名（アンチパターン）

### 1. 曖昧な名前

| 対象 | 説明 | 良い例 (Good) | 悪い例 (Bad) |
| :--- | :--- | :--- | :--- |
| **曖昧な名前** | 文脈がないと意味が分からない名前は避ける。 | `user_profile_data`, `is_enabled_flag` | `data`, `flag`, `item`, `value` |

### 2. 過度な省略

| 対象 | 説明 | 良い例 (Good) | 悪い例 (Bad) |
| :--- | :--- | :--- | :--- |
| **過度な省略** | 初見で理解できない省略は避ける。 | `user_name`, `created_at`, `description` | `usr_nm`, `crt_dt`, `desc` |

### 3. SQL予約語の使用

| 対象 | 説明 | 良い例 (Good) | 悪い例 (Bad) |
| :--- | :--- | :--- | :--- |
| **SQL予約語** | エラーの原因になるため、そのまま使わない。 | `order_summary`, `user_group`, `selected_item` | `order`, `group`, `select`, `user` |

## 参考文献

[DBテーブル・カラム名の命名規則チートシート](https://zenn.dev/channnnsm/articles/37969fc62480ca)