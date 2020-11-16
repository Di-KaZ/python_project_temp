# Pearls and Jewels

IPI first project in Python + flask

# The idea

Be able to save all funny and WTF moment of our firends / colleagues in a small catchy sentence or image

## Some screenshots

![login](https://github.com/Di-KaZ/Pearls_and_Jewels/blob/moussa/screen.PNG)
![home](https://github.com/Di-KaZ/Pearls_and_Jewels/blob/moussa/screen2.PNG)
![search](https://github.com/Di-KaZ/Pearls_and_Jewels/blob/moussa/screen3.PNG)
![account](https://github.com/Di-KaZ/Pearls_and_Jewels/blob/moussa/screen4.PNG)

# HOW TO RUN

The project have two distinct parts :

- The flask JSON API
- The React front

## JSON API

You can use a virtualenv to run the the **flask json api** you need these python dependency :

- flask (obviously)
  ```bash
  pip3 install flask
  ```
- flask_sqlalchemy
  ```bash
  pip3 install flask-sqlalchemy
  ```
- sqlalchemy
  ```bash
  pip3 install sqlalchemy
  ```
- python-dotenv

  ```bash
  pip3 install python-dotenv
  ```

- jwt
  ```bash
  pip3 install jwt
  ```

now run

```bash
cd flask_api && flask run # in the root folder
```

## REACT FRONT

then you need to run the react front (install node.js blah blah...)

```bash
npm i && npm start # in the root folder
```

> Note : They should be run at the same time in two different terminal

and youre up and running !

# Features

## Implemented

- account Creation / Login / Delete / Logout
- create Pearl (phrase)
- comment Pearl (and comments)
- search
- Pagination

## Not yet Implemented

- reactions to Pearls
- formating in Pearl (colors line break ect)
- image in pearls
