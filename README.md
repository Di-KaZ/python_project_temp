# python_project_temp
IPI first project in Python + flask


# The idea
Be able to save all funny and WTF moment of our firends / colleagues in a small catchy sentence or image


# HOW TO RUN

use virtualenv
```bash
source flask_api/env/bin/activate
```
then you need to run the react front
```bash
yarn start
```

and the flask api
```bash
yarn start-api
```

and youre up and running !

# Features
- account Creation / Login
- send post (phrase and images)
- react to post (commentary or emote)
- filter and search

# Plus
beautiful UI and ability to style post as we like to match the image / sentence

# Tables and joins


```mermaid!
classDiagram
    Users <|-- Comments
    Users <|-- Pearls
    Pearls <|-- Comments
    Associate <|-- Smileys
    Associate <|-- Pearls
    Associate <|-- Users
    Users : +int id
    Users : +String username
    Users : +String login
    Users : +String psw
    Users: +create()
    Users: +login()
    Users: +update()
    Users: +delete()

    class Comments{
      +int id
      +int id_user
      +int id_pearl
      +String commentaire
      +create()
      +update()
      +delete()
    }
    class Pearls{
      +int id
      +int id_user
      +String content
      +datetime date
      +create()
      +update()
      +delete()
    }
    class Smileys{
      +int id
      +String alt_name
      +String img_link
      +create()
      +delete()
    }
    class Associate{
      +int id
      +int id_users
      +int id_smileys
      +int id_pearls
    }
```
     
