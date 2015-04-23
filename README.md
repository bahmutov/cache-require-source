# cache-require-source

> Caches loaded source in module require to speed up next app load

This is a partial solution to slow Node application startup. 
See [Node’s `require` is dog slow](https://kev.inburke.com/kevin/node-require-is-dog-slow/) for details.

## Use

    npm install --save cache-require-source

Load the module first in your application file

```js
// index.js
require('cache-require-source');
...
```

The first time the app loads a cache of 3rd party file sources will be saved in a local `.` file.
Every application startup after that will reuse this cache to avoid loading multiple files.
Works well with [cache-require-paths](https://github.com/bahmutov/cache-require-paths).

## TODO

- [ ] Cache only the 3rd party javascript sources
- [ ] Invalidate cache if dependencies in the package.json change

## Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cache-require-source/issues) on Github
