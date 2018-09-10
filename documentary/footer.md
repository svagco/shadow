
## Direct VS Standalone

The shadow has to be implemented as a separate element of the svg, and not part of the main window, because when embedded as in an `img` tag and resized, the quality will be lost on Mobile Safari. The image below shows what happens, and how this package is solving the problem.

<img alt="Compare Images" src="https://raw.github.com/svagco/shadow/master/images/compare.png">

## TODO

- [ ] Add an `offsetX` property to the shadow.

## Copyright

(c) [SVaG][1] 2018

[1]: https://svag.co
