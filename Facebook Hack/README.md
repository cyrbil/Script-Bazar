From my blog: cyrbil.tk

Aujourd�hui j'ai appris gr�ce � notre prof de php que facebook classait vos amis et centres d�int�r�ts, pourquoi ? Simplement pour pouvoir avoir des r�ponses pertinentes lorsque vous essayez de chercher quelque chose.
Apr�s un petit reverse on peut trouver l�appel � l�api de facebook (non, pas celle des dev, celle de facebook THE api) et que celle-ci fait un appel qui se r�sume �: 
https://www.facebook.com/ajax/typeahead/search/bootstrap.php
Ils y a quelques param�tres dont certains obscures � voici le d�tails:
__a: visiblement toujour � 1
filter un array selectionnant les objets (user, app, page, group, friendlist�)
no_cache: boolean, pas besoin d�explication, agit sur les headers
viewer: facebook id du viewer (personne acc�dant aux donn�es)
__user: facebook id de l�utilisateur subissant la requ�te
options: array d�option (lean retourne seulement les ids avec la pond�ration) 
token: un token de validation, optionnel si on se query soit m�me en �tant logu�
lazy: boolean, ne retourne rien si pr�sent
Voila � quoi ressemble la requ�te pour les amis trier pas pond�ration avec un max d�infos:
https://www.facebook.com/ajax/typeahead/search/bootstrap.php?__a=1&filter[0]=user&no_cache=1&viewer=1********3&__user=1********3

Vous pouvez tester en pla�ant votre id.
Il en sort un gros objet avec plein d�infos comme le nom, la photo, l�url � etc.

Il faut savoir que sans tokens il n�est pas possible de requ�ter autre chose que sois m�me (l�auth passant alors par la session visiblement).
Donc pas possible de voir les infos de Mark Zuckerberg par exemple.

Parce que le json n�est pas human readable j�ai pondu un petit script qui va s�occuper de voir comment facebook vois nos relations (marrant de voir qui sont nos amis les plus proches o� qui ont consultent souvent �).

Prudence toutefois, ce script DOIT �tre �x�cuter dans la fen�tre de facebook. Ce qui lui donne acc�s � votre session, vos infos, et lui permet de faire tout ce qui est possible sur facebook. (voir mon viel article) 
Je garantis toutefois que le script ne fait rien de m�chant, (il r�cup�re l�id puis lance une requ�te).

Cette avertissement est avant tout pour �duquer, ne copier jamais des urls commen�ant par javascript:, � moins de savoir ce que fait totalement le code.
Et voici notre fameux lien. Il vous faudra faire clic-droit, et le coller dans un onglet avec facebook d�ouvert.
Derni�re avertissement, facebook peut changer �a page, la viabilit� de ce script changera aussi et pourra produire des comportements al�atoires �