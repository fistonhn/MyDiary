# MyDiary

[![Build Status](https://travis-ci.org/amilykassim/PropertyProLite.svg?branch=develop)](https://travis-ci.org/amilykassim/PropertyProLite)       [![Coverage Status](https://coveralls.io/repos/github/amilykassim/PropertyProLite/badge.svg?branch=develop)](https://coveralls.io/github/amilykassim/PropertyProLite?branch=develop)       [![Maintainability](https://api.codeclimate.com/v1/badges/3dbe4a90345d8b162c9b/maintainability)](https://codeclimate.com/github/amilykassim/PropertyProLite/maintainability)

# Project Overview

MyDiary is an online journal where users can pen down their thoughts and feelings.

# Features

- A user can create an account if he doesn't have one
- A user can log in to his account if he does have it
- A user can view all entries to their diary.
- A user can view the contents of a diary entry.
- A user can dd entry.
- A user can modify an entry.
- A user can delete an entry.

# Built With

- Node.js
- Express framework
- Html
- CSS
- Javascript

# Api Endpoints

- POST    /auth/signup                               - Create user account 
- POST    /auth/signin                               - Login a user
- POST    /api/v1/entries                            - User can add an entry 
- PATCH   /api/v1/entries/:id                        -user can modify an entry                
- GET     /api/v1/entries                            - User can get all entries   
- GET     /api/v1/entries/:id                        - User can get specific entry  
- DELETE  /api/v1/entries/:id                        - User can delete an entry 

# API documentation 

 The documenation of the API can be found at : 
 <a href="">  </a>

# Installation
- Run git clone https://github.com/fistonhn/MyDiary.git
- Run npm `install` to download and install all packages
- Run npm `devStart` to start the server
- And then Test the end points using postman or your browser

# Contributing
> You can contribute to this project by forking the project https://github.com/fistonhn/MyDiary.git

> And then submit your changes by creating a new pull request https://github.com/fistonhn/MyDiary/compare

### Author

[HABIMANA Fiston](https://github.com/fistonhn/MyDiary)

# Acknowledgments

- [Andela Kigali](https://andela.com/)
