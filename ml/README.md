# ML

## Setup

* Check you have python 3.6 installed
* install pip with apt-get
* install pipenv : pip3 install pipenv
* install dependencies: pipenv install

## intellij

* Install python plugin 
* Setup pipenv (https://www.jetbrains.com/help/idea/pipenv.html)
    * File -> Project structure
        * Platform Settings -> SDK -> New: go to python install path, select pipenv
        * Project Settings -> Project -> Project SDK

## To run shell with pipenv environment

pipenv shell

# Deploy to a new server

* Before commit to deploy: pipenv lock --requirements > requirements.txt to generate requirement
