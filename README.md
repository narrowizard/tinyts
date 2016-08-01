# tinyts
## start
1. configure your nodejs develop environment.(5.x)
1. install typescript.(npm install typescript)

### with nresource project
1. install [nresource](https://github.com/narrowizard/nresource) project.
1. create your ts project on `{nresource root}/content/project/{your project}` directory. eg: `/home/node/nresource/content/project/demo`.
1. install tinyts framework on your project.(npm install tinyts)
1. write your viewmodel class on `{your project}/viewmodels/{your viewmodel}`.eg: `/home/node/nresource/content/project/demo/viewmodels/demo.ts`.
1. add reference to your viewmodel. router: `{your nresource host}/tinyts/{your project name}/{your viewmodel path}`.eg: `http://localhost:8124/tinyts/demo/demo.js`.

### without nresource project
1. create your project.
1. install tinyts framework on your project.(npm install tinyts)
1. coding and coding.
1. [compile](http://www.typescriptlang.org/docs/tutorial.html) your ts code into js code.
1. add reference to the compiled js file.

## dependency
1. [requirejs](http://requirejs.org/)
1. [jquery](https://jquery.com/)
1. [linqjs](https://github.com/mihaifm/linq)

## support 
### you need add the reference of [es5 shim](https://github.com/es-shims/es5-shim) in the older browser.

### the following features are only supported in modern browser(IE9+, chrome, firefox)
1. router
2. file uploader