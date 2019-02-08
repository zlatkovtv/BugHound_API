<p align="Left">
<img src="api/assets/logoname.png">
</p>

# BugHound-API

> A restful API for the Bug Hound client. Bug hound is a free-service(maybe) that will allow users to manage, record, and update any bugs during their development of their programming projects. 

## Key Features
- Using web browser, create, edit, and update "bug" reports on multiple products
- Store error report contents in relational tables
- Access error reports content via SQL
- Search for bugs on multiple fields
- Facilities to add, delete or update information for program, releases, functional area, employees

## Toolkit
- ES2018 support via Babel
- Main technologies - express.js, MySQL
- authentication via [JWT](https://jwt.io/)
- environments for `development`, `testing`, and `production`
- linting via [eslint](https://github.com/eslint/eslint)
- integration tests running with [Jest](https://github.com/facebook/jest)
- built with [npm sripts](#npm-scripts)

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/zlatkovtv/BugHound_API.git
```

then

```sh
# cd into project root
$ npm i
$ npm i mysql2 -S
# start the api on port 2017
$ npm start
```

For the Bug Hound Vue Client please check out 
[Bug Hound](https://github.com/Lazer7/BugHound).