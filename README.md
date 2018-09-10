# @svag/shadow

[![npm version](https://badge.fury.io/js/%40svag%2Fshadow.svg)](https://npmjs.org/package/@svag/shadow)

`@svag/shadow` is a shadow from a window. It is created as a separate element to make sure that when the `svg` image embedded in the `image` tag is resized, the actual content of the window will not be pixelated.

```sh
yarn add -E @svag/shadow
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`shadow(options: ShadowOptions): { translate: string, shadow: string }`](#shadowoptions-shadowoptions--translate-string-shadow-string-)
    * [`ShadowOptions`](#shadowoptions)
- [TODO](#todo)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import Shadow from '@svag/shadow'
```

### `shadow(`<br/>&nbsp;&nbsp;`options: ShadowOptions,`<br/>`): { translate: string, shadow: string }`

Creates a shadow for a window with given width and height. The `translate` string is also returned to add as a `transform` property to the window which drops the shadow, to make sure the shadow is not cropped.

__<a name="shadowoptions">`ShadowOptions`</a>__: Options to generate macOS like  shadow using a blur filter.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| __width*__ | _number_ | The width of the window. | - |
| __height*__ | _number_ | The height of the window. | - |
| rx | _number_ | The `x` corner radius of a window which drops the shadow. | `6` |
| ry | _number_ | The `y` corner radius of a window which drops the shadow. | `6` |
| offsetY | _number_ | The offset from the top of the window. | `25` |
| stdDeviation | _number_ | The standard deviation for the blur. It will spread twice this distance in each direction. | `27.5` |

```js
import { svg, rect } from '@svag/lib'
import Shadow from '@svag/shadow'

// 0. DEFINE width and height of the window and its shadow.
const width = 250
const height = 250

// 1. CREATE a shadow element.
const { translate, shadow } = Shadow({
  width,
  height,
})

// 2. CREATE a window element to place above the shadow.
const window = rect({
  transform: translate,
  width,
  height,
  rx: 6,
  ry: 6,
  stroke: 'grey',
  fill: '#FFFFFF',
})

// 3. CREATE an svg image.
const image = svg({
  content: [shadow, window],
  height: 375,
  width: 375,
  stretch: false,
})
```

```svg
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0, 0, 375, 375" width="375px" height="375px">
  <g transform="translate(55, 25)" filter="url(#shadow)" fill="none">
    <defs>
      <filter x="-22%" y="-10%" width="144%" height="142%" id="shadow">
        <feOffset dy="25" in="SourceAlpha" result="so"/>
        <feGaussianBlur stdDeviation="27.5" in="so" result="sb"/>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" in="sb" result="sm"/>
        <feMerge>
          <feMergeNode in="sm"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect height="250" width="250" rx="6" ry="6" fill="white"/>
  </g>
  <rect transform="translate(55, 25)" width="250" height="250" rx="6" ry="6" stroke="grey"
        fill="#FFFFFF"/>
</svg>
```

![generated shadow](images/shadow.svg)

## TODO

- [ ] Add an `offsetX` property to the shadow.

## Copyright

(c) [SVaG][1] 2018

[1]: https://svag.co
