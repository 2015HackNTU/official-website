# official-website

HackNTU 2015 Official Website


Environment Setup
-----------------

```
$ sudo npm install
$ npm start
```

The server will listen on the port 3000

Installation of New Node Module
-------------------------------

```
npm install 'module_name' --save
```

Do not forget `--save` argument, which saves new module to `package.json` for dependency use. 


Repository Branches
-------------------
* `master`: Main development branch.
* `old-version`: Backup for old-version official website.
* `<other branches>`: Feature branches.


Directory Structure
-------------------
* `views` : Contains all the `ejs` views (organized by each page) for server render.
* `routes`: Contains all the `page routers` and `api routers` (organized by each page).
* `public` : Contains all non-compiled assets, such as css, js, imgs etc.
* `config` : Configurations.
* `node_module` : Contains all the node packages installed from `npm install`.
* `*/shared` : `shared` folders within each type of directory contain those files which are commonly included/used, for example, `navbar` and `footer` would be put into the `shared` folder in views. or `jQuery` and `angularJS` in `shared` folder would be in `public/js` etc.
* `public/libs` : Put all libraries, such as `jQuery`, `Bootstrap` etc.


Url Usage
---------
* `/` : home page.
* `/'page_name'` : 'page_name' page.
* `/api/'page_name'` : api for 'page_name' page.
