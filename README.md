# project-frontend-template

 _**Team G21 Project Frontend Structure**_
 
**Language:** Typescript [https://www.typescriptlang.org/docs]

**Framework:** NuxtTS [https://typescript.nuxtjs.org/]

**UI Design:** Vuetify.js [https://vuetifyjs.com/en/]

Extra package used:
- Axios
- Js-cookie
- @nuxtjs/auth
- Vee-validate
- Vue-fontawesome
- Vue-class-component
- Vue-property-decorator

# How to use

Fork this to your repo and code (duh)

# Project Structure

Aside from basic Nuxt.js Application structure (https://nuxtjs.org/docs/2.x/directory-structure/nuxt)
This template has extra directories and files

**constants**: Contain application constants for importing later

**repositories**: Store all the axios method

**utils**: All the utils function helper like cookies, parse date, ...

_**.env.development**_ : Environment for development stage

_**.env.production**_: Environment for production stage

## Build Setup

```bash
# select the environment for the application
# Developement
$ cp .env.development .env

# Or production
$ cp .env.production .env

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```


