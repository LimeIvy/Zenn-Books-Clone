# useSWRとは

swr(stale-while-revalidate)：簡単に言うと、`キャッシュをなるべく最新に保つ機能`

## 特徴

- 速い、軽量そして再利用可能 なデータの取得
- 組み込みのキャッシュとリクエストの重複排除
- リアルタイムな体験
- トランスポートとプロトコルにとらわれない
- SSR / ISR / SSG support
- TypeScript 対応
- React Native

自動で再検証が行われ、
- ページがフォーカスした時
- タブを切り替えた時
- focusThrottleIntervalオプションで指定した期間内

に、SWRは自動的にデータを再検証する。

これにより、画面の内容を常に最新の状態に保つことができる。

## 使用方法

```ts
import useSWR from 'swr'
import axios from 'axios'
 
const fetcher = url => axios.get(url).then(res => res.data)
 
function App () {
  const { data, error } = useSWR('/api/data', fetcher)
  // ...
}
```

`useSWR('api-url', fetcher)`と指定することで、 返り値として`data`と`error`を受け取れる。

- dataがundefinedだとロード中
- errorがundefinedだとエラー未発生　

となる。

また、useSWRは値が使われているかを検知して、それぞれを ステートフルな値として扱っているため、useSWRの引数として指定した変数のみを更新する。

使ってもないのにerrorやisValidatingを取得してると、無駄な描画更新が発生してしまうので注意する。

## fetcherのエラー時

SWRではfetcherがエラーを発生した場合、fetcherを[exponential backoff アルゴリズム](https://en.wikipedia.org/wiki/Exponential_backoff) を使用して再実行する。

onErrorRetryオプションを使用して、この動作をオーバーライドすることが可能。

**使用例:**
```ts
useSWR('/api/user', fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404では再試行しない。
    if (error.status === 404) return
    // 特定のキーでは再試行しない。
    if (key === '/api/user') return
    // 再試行は10回までしかできません。
    if (retryCount >= 10) return
    // 5秒後に再試行します。
    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
  }
})
```

また、`shouldRetryOnError: false` とすることで再試行自体を無効にできる。

## Mutationについて

ここでのMutationとはSWRにキャッシュの更新を通知するものです。

stateで管理していないもの(useSWRで取得したデータ)をサーバの更新を待たずにキャッシュのみ更新できます

**使用例**

```ts
import useSWR from 'swr'
 
function Profile () {
  const { data, mutate } = useSWR('/api/user', fetcher)
 
  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button onClick={async () => {
        const newName = data.name.toUpperCase()
        // データを更新するために API にリクエストを送信します
        await requestUpdateUsername(newName)
        // ローカルのデータを即座に更新して再検証（再フェッチ）
        mutate({ ...data, name: newName })
      }}>Uppercase my name!</button>
    </div>
  )
}
```

再検証されたくない(渡した値を最新とする)場合は、第二引数にfalseを渡す

```ts
mutate({ ...cat, name: catName }, false);
```

## 参考文献

[そうです。わたしがReactをシンプルにするSWRです。](https://zenn.dev/uttk/articles/b3bcbedbc1fd00)
