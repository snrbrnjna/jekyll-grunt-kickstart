# Jekyll Grunt Kickass

A [h5bp](http://html5boilerplate.com/) equipped scaffold for developing a Jekyll website with [grunt](http://gruntjs.com/) and [bower](http://bower.io/).

## Usage

- Clone this repo
- Rename remote origin to jekyll-grunt-kickass:  
``git remote rename master jekyll-grunt-kickass`` 
- Checkout new master branch for developing your site with this toolset:  
``git checkout -b master``
- Develop your app and commit to your repo.

### Grunt Tasks
- ``serve``  
  build dev version (jekyll & copy src) and serve with livereload on any change
- ``serve:dist``  
  build dist version and serve it without livereload
- ``build``  
  build dist version (jekyll & usemin).
- ``deploy:tunneled``  
  build und rsync zu in ``_config.deploy.yml`` konfiguriertem Ziel
- ``deploy:tunneled``  
  build und rsync via tunnel.
