# Pearls and Jewels

IPI first project in Python + flask

# The idea

Be able to save all funny and WTF moment of our firends / colleagues in a small catchy sentence or image

## Some screenshots

![login](http://url/to/img.png)
![home](http://url/to/img.png)
![search](http://url/to/img.png)
![account](http://url/to/img.png)

# HOW TO RUN

The project have two distinct parts :

- The flask JSON API
- The React front

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

then you need to run the react front (install node.js blah blah...)

```bash
npm start # in the root folder
```

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
