
## API

The package is available by importing its default function:

```js
import Shadow from '@svag/shadow'
```

```### shadow => { translate: string, shadow: string }
[
  ["options", "ShadowOptions"]
]
```

Creates a shadow for a window with given width and height. The `translate` string is also returned to add as a `transform` property to the window which drops the shadow, to make sure the shadow is not cropped.

<img alt="Generated Shadow" src="https://raw.github.com/svagco/shadow/master/images/shadow.svg?sanitize=true">

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.js, ../src => @svag/shadow%

%FORK-svg example example/example%
