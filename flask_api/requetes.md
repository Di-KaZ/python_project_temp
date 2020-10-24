# Les differentes requetes

```py
"""
    start_from est la premiere pearl que l'on veut recuperer et num_to_get est le nombre de pearl qu'on veut recup apres la premiere
    les pearl sont a trier de base dans l'ordre de la plus recente a la moins recente
    si num_to_get == -1 on les recupere toutes, 0 recupere que celle possedant l'id
"""
get_pearl(start_from -> int, num_to_get -> int):
    return json or 'ko'# le contenu de la pearl ex le texte, le nombre de reaction smiley, l'image, les 10 premiers commentaires

"""
    parent_id l'id du parent du commentaire peut etre soit une perles soit un commentaire, start_from on recup a partir du comment n et on recup
    num_to_get le mombre de commentaire a recup a partir de start_from
    type : le parent est un commentaire ou une perle
    les commentaires sont a trier de base dans l'ordre du la plus recent au moins recent
"""
get_comment(parent_id -> int, type -> string, start_from -> int, num_to_get -> int):
    return json or 'ko'#le contenu du la pearl ex le texte, l'image

"""
    pearl_id id de la pearl ou rajouter le smiley,
    wich : quel smiley ajouter
    who : le nom de l'utilisateur faisant la requete
    un utilisateur ne peut ajouter q'un seul smiley
"""
@login_required # requete autoriser seulement si un utilisateur est connecter decorateur que j'ai creer il faut juste l'ecrire comme ici avant ta fonction
add_remove_smiley(pearl_id -> int, wich -> string, who -> string):
    return 'ok' or 'ko'

"""
    ajoute un commentaire en dessou du parent
"""
@login_required # requete autoriser seulement si un utilisateur est connecter
add_comment(parent_id -> int, content -> string, who -> string):
    return 'ok' or 'ko'

"""
    creer une nouvelle perle avec le contenu et/ou la photo
    TODO trouver comment stocker la photo
"""
@login_required # requete autoriser seulement si un utilisateur est connecter
add_pearl(content -> string, who -> string, file -> ?):
    return 'ok' or 'ko'
```
