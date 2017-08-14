# tinyts2
[![Build Status](https://travis-ci.org/narrowizard/tinyts.svg?branch=master)](https://travis-ci.org/narrowizard/tinyts)
[![Coverage Status](https://coveralls.io/repos/github/narrowizard/tinyts/badge.svg?branch=master)](https://coveralls.io/github/narrowizard/tinyts?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is TinyTS ?
TinyTS is a front-end web framework based on typescript. TinyTS is very light-weight, only 9.4 kb after gzip compressed.  
+ Features
    + Dependency Injection
    + Data Binding
    + Extendible View
+ Project Target  
    ECMAScript 5
+ Browser Support  
    + modern browser: chrome,firefox,ms edge  
    + To support IE(9+):  
        + IE 11: add es6-shim polyfill and promise polyfill.
        + IE 9,10: add es6-sham polyfill and ie11 polyfill.
        + IE 9: do not support router(you can implement one based on [history](https://github.com/browserstate/history.js)) 

    you can find the polyfill file both in the `/libs` directory in this project and their own repositories(metioned in next section **Libs**).

## Get started
you can find tinyts documentation [here](https://narrowizard.gitbooks.io/tinyts-documentation/content/chapter1.html). 
## Issues
+ not support array proxy in ie 9,10

## Libs
+ [jquery](https://github.com/jquery/jquery/tree/1.12-stable)  
+ [multiplexjs(linq)](https://github.com/multiplex/multiplex.js)
+ [es6-shim](https://github.com/paulmillr/es6-shim) 
+ [promise](https://github.com/taylorhakes/promise-polyfill)
+ [mustache](https://github.com/janl/mustache.js)  
+ [systemjs](https://github.com/systemjs/systemjs)  
+ [class-validator](https://github.com/pleerock/class-validator)  

## Build in local
```shell
# clone the repository locally.
git clone https://github.com/narrowizard/tinyts.git
# install node modules
npm install
# run build task with npm
npm run build
# unit test
npm test
```
