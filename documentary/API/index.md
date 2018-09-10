
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

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.js, ../src => @svag/shadow%

%FORK-svg example example/example%

![generated shadow](images/shadow.svg)
