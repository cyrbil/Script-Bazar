From my blog: cyrbil.tk

Aujourd’hui j'ai appris grâce à notre prof de php que facebook classait vos amis et centres d’intérêts, pourquoi ? Simplement pour pouvoir avoir des réponses pertinentes lorsque vous essayez de chercher quelque chose.
Après un petit reverse on peut trouver l’appel à l’api de facebook (non, pas celle des dev, celle de facebook THE api) et que celle-ci fait un appel qui se résume à: 
https://www.facebook.com/ajax/typeahead/search/bootstrap.php
Ils y a quelques paramètres dont certains obscures … voici le détails:
__a: visiblement toujour à 1
filter un array selectionnant les objets (user, app, page, group, friendlist…)
no_cache: boolean, pas besoin d’explication, agit sur les headers
viewer: facebook id du viewer (personne accédant aux données)
__user: facebook id de l’utilisateur subissant la requête
options: array d’option (lean retourne seulement les ids avec la pondération) 
token: un token de validation, optionnel si on se query soit même en étant logué
lazy: boolean, ne retourne rien si présent
Voila à quoi ressemble la requête pour les amis trier pas pondération avec un max d’infos:
https://www.facebook.com/ajax/typeahead/search/bootstrap.php?__a=1&filter[0]=user&no_cache=1&viewer=1********3&__user=1********3

Vous pouvez tester en plaçant votre id.
Il en sort un gros objet avec plein d’infos comme le nom, la photo, l’url … etc.

Il faut savoir que sans tokens il n’est pas possible de requêter autre chose que sois même (l’auth passant alors par la session visiblement).
Donc pas possible de voir les infos de Mark Zuckerberg par exemple.

Parce que le json n’est pas human readable j’ai pondu un petit script qui va s’occuper de voir comment facebook vois nos relations (marrant de voir qui sont nos amis les plus proches où qui ont consultent souvent …).

Prudence toutefois, ce script DOIT être éxécuter dans la fenètre de facebook. Ce qui lui donne accès à votre session, vos infos, et lui permet de faire tout ce qui est possible sur facebook. (voir mon viel article) 
Je garantis toutefois que le script ne fait rien de méchant, (il récupère l’id puis lance une requête).

Cette avertissement est avant tout pour éduquer, ne copier jamais des urls commençant par javascript:, à moins de savoir ce que fait totalement le code.
Et voici notre fameux lien. Il vous faudra faire clic-droit, et le coller dans un onglet avec facebook d’ouvert.
Dernière avertissement, facebook peut changer ça page, la viabilité de ce script changera aussi et pourra produire des comportements aléatoires …