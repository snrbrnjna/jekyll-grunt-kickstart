# Jekyll Grunt Kickass

A [h5bp](http://html5boilerplate.com/) equipped scaffold for developing a Jekyll website with [grunt](http://gruntjs.com/) and [bower](http://bower.io/).

## Usage

- Clone this repo
- Rename remote origin to jekyll-grunt-kickass:  
``git remote rename master jekyll-grunt-kickass`` 
- Develop your app and commit to your repo.

### Grunt Tasks
- __serve__
  build dev version (jekyll & copy src) and serve with livereload on any change
- __serve:dist__
  build dist version and serve it without livereload
- __build__
  build dist version (jekyll & usemin)
- __deploy__
  build und rsync zu in ``_config.deploy.yml`` konfiguriertem Ziel
- __deploy:tunneled__
  build und rsync via tunnel.
