# mooncal

各日の月の満ち欠けを視覚的に表現した、1年間のカレンダーを表示するWebコンポーネントです。

## デモ

https://code4fukui.github.io/mooncal/

デモページでは1年間のカレンダーが表示されます。各日付セルには、その日の月の満ち欠けの視覚的表現の上に日付の数字が重ねて表示されます。上部のドロップダウンメニューで異なる年に切り替えることができます。

## 機能

- 1年間のカレンダーグリッドを表示します。
- 各日の月の満ち欠けを視覚的に表示します。
- ユーザーが異なる年を選択して切り替えることができます。
- モダンなJavaScriptモジュールとWebコンポーネントで構築されています。

## 使い方

`mooncal`を使用するには、HTMLコンテナと、カレンダーをインスタンス化して月の満ち欠けを配置するためのスクリプトが必要です。

**HTML:**

```html
<!-- カレンダー用のコンテナを追加 -->
<main id="main"></main>
```

**JavaScript:**

```javascript
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { CalendarView } from "https://code4fukui.github.io/calendar-view/calendar-view.js";
import { MoonAge } from "https://code4fukui.github.io/moon-age/moon-age.js";

// 1. 対象年を設定
const year = new Date().getFullYear();

// 2. カレンダービューを作成して追加
const cal = new CalendarView(year);
document.getElementById("main").appendChild(cal);

// 3. 1年間の各日を反復処理して月の満ち欠けを追加
for (let day = new Day(`${year}-01-01`); day.year == year; day = day.dayAfter(1)) {
  // 現在の日のセルを取得
  const div = cal.querySelector(".c" + day.toStringYMD());
  if (div) {
    // MoonAgeコンポーネントを作成
    const moonage = new MoonAge();
    moonage.setDate(day.toString()); // コンポーネントに日付を設定

    // 月の満ち欠けを背景要素としてスタイル設定し追加
    div.style.position = "relative";
    moonage.style.position = "absolute";
    moonage.style.top = "0px";
    moonage.style.left = "0px";
    moonage.style.zIndex = -1; // 日付の数字の後ろに配置
    div.appendChild(moonage);
  }
}
```

## 依存関係

- [moon-age](https://github.com/code4fukui/moon-age/): 月の満ち欠けを表示するWebコンポーネント。
- [day-es](https://github.com/code4fukui/day-es/): 軽量な日付ユーティリティライブラリ。
- [calendar-view](https://github.com/code4fukui/calendar-view/): 1年間のカレンダーグリッドを描画するWebコンポーネント。

## 謝辞

`moon-age.js`ライブラリはakebi_mh氏の作品に基づいています。
- **元記事:** [月齢と月の満ち欠けを表示 #JavaScript - Qiita](https://qiita.com/akebi_mh/items/b6a9c056d9198552e7b4)

## ライセンス

[MIT](LICENSE)
