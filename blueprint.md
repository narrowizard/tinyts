# tinyts blueprint

## version 1.0
1. ViewModel
    1. dependency injector
1. View
    1. ViewGroup&lt;T&gt;
    1. VirtualView&lt;T&gt;
1. Model
    1. accessor validator
    
1. Control
    1. the base View class
    1. text view
    1. input view with control validator
    1. list view, page manager
1. Control Implement
    1. button
    1. checkbox
    1. confirm dialog
    1. dropdown list
    1. editdialog
    1. file uploader
    1. imageview
    1. radiobutton
    1. selectbutton
    1. table
    1. textbox 
    1. ullist
1. Service
    1. service pool
1. Utils
    1. array extension, date extension
    1. http: url parser, http utils, router
    1. model injector
    1. time, countdown
    1. table extension

## version 1.1
1. es6 promise
1. es6 proxy

## version 1.2
1. data binding
    1. single flow data binding
    1. double flow data binding
1. template syntax

## dependency
1. [requirejs](http://requirejs.org/)
1. [jquery](https://jquery.com/)
1. linqjs(https://github.com/mihaifm/linq)

## support 
### you need add the reference of [es5 shim](https://github.com/es-shims/es5-shim) in the older browser.

### the following features are only supported in modern browser(IE9+, chrome, firefox)
1. router
2. file uploader