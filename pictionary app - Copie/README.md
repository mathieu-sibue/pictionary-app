############################################################################################################## MyPictionary ###############################################################################################################
d�velopp� par Mathieu Sibu� (premier site web, non encore disponible sur une URL)
(visionner ce fichier en fullscreen svp)



	SOMMAIRE :
	1.REMARQUE PRELIMINAIRE
	2.DESCRIPTION DU SITE
	3.PREREQUIS TECHNIQUES
	4.REMARQUES CONCERNANT L'IMPLEMENTATION TECHNIQUE CHOISIE POUR LE PROJET
	5.DESCRIPTION TECHNIQUE
	6.PROCEDURE D'INSTALLATION DU PROJET
	7.PRECHARGEMENT DES DONNEES
	8.DESCRIPTION DES JEUX DE DONNEES
	9.LISTE DES FONCTIONNALITES PRESENTES DANS LA VERSION LIVREE
	10.REMARQUES CONCERNANT LA SUITE DE L'IMPLEMENTATION DU PROJET


_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


1.REMARQUE PRELIMINAIRE :
Pour le moment, seuls les sprints 1 et 2 des �tapes d'impl�mentation donn�es en consigne ont �t� mis en oeuvre.
(Je souhaitais parfaire les deux premiers sprints plut�t que de passer directement au troisi�me en d�pit de son importance.)
De ce fait, la description qui suit concernant la phase de jeu du site MyPictionary d�finit davantage des lignes directrices que mes r�alisations.

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


2.DESCRIPTION DU SITE :
MyPictionary est un site qui permet de jouer au jeu Pictionary en ligne, int�grant un syst�me de comptes utilisateurs. 
Chaque utilisateur peut cr�er un lobby de jeu ou en rejoindre un ; le cr�ateur de la partie sera le dessinateur pour l'ensemble des manches.
Les autres participants dans le lobby devront deviner les plus vite possible les objets dessin�s par le cr�ateur de la partie. 
L'objet � dessiner par le cr�ateur du lobby � chaque manche apparait sur sa fen�tre avec une br�ve description au d�but de chaque manche.
Les objets � dessiner dans les manches d'une partie sont d�termin�s al�atoirement � partir d'une base de donn�es.

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


3.PREREQUIS TECHNIQUES (voir fichier package.js) :
- ma�trise de Git
- ma�trise de npm v6.9.0
- ma�trise de node v12.0.0
- ma�trise du Framework Express.js v4.17.1
- ma�trise de MongoDB, du package mongoose v5.6.11 et du package connect-mongo v3.0.0	
- ma�trise du Framework CSS Bootstrap v4.3.1
- ma�trise du package de templating de fichiers HTML express-edge v1.0.0 et de edge v7.10.1
- ma�trise du package body-parser v1.19.0
- ma�trise du package bcryptjs v2.4.3
- ma�trise du package express-session v1.16.2

(pour finaliser le sprint 2 :
- ma�trise du package axios v0.19.0)

(pour le sprint 3 :
- ma�trise du package socket.io v2.2.0
- ma�trise de l'�l�ment HTML/API canvas
- ma�trise du Framework JS React v16.9.0)

(pour le sprint 4 :
- ma�trise de l'outil de v�rification de scripts ESLint v6.5.1
- ma�trise de GitLab CI)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


4.REMARQUES CONCERNANT L'IMPLEMENTATION TECHNIQUE CHOISIE POUR LE PROJET :
Faute de temps, je n'avais pas pu me familiariser avec le framework JS React que je souhaitais utiliser pour ce projet lorsque j'en ai commenc� le d�veloppement.
(Le d�veloppement a d�but� en ao�t, ma mont�e en comp�tences par l'interm�daire de tutoriels (HTML, CSS, JS,...), de rencontres via mon stage op�rateur et de la documentation des frameworks/packages avait d�but� fin juin.)
Pour g�n�rer des pages web dynamiques, mon choix s'�tait initialement port� vers l'outil de templating express-edge, tr�s simple d'utilisation.
Il est notamment possible de render une page HTML en utilisant des objets cr��s dans le back.

Ainsi, je pensais limiter l'utilisation de React uniquement � la phase de jeu, pensant � tort que ce framework ne permettait qu'une manipulation plus ais�e du DOM.
N�anmoins, apr�s documentation fin septembre et discussion avec Alexandre Gilles-Lordet et Arnaud Louys (qui vont �galement suivre le parcours DTY), j'ai r�alis� que React �tait un outil plus puissant qu'un outil de templating.
Mais surtout, son utilisation n�cessite une int�gration au code d�s le d�but du d�veloppement du projet, ce dont je ne m'�tais pas rendu compte initialement.
Ainsi, l'architecture de mon projet n'est pas organis�e en un dossier FRONT (comportant des fichiers HTML, JS et un fichier js particulier qui tournerait sur un "serveur" pour g�n�rer dynamiquement les pages du site) et un dossier BACK (avec les routes, les ressources publiques,...) � faire tourner sur un autre "serveur" (ou VM...).

Influenc� par les d�veloppeurs avec qui j'avais �chang� au cours de mon stage op�rateur, j'avais fait le choix d'organiser mon code selon l'architecture MVC (models, views, controllers).
Dans mon code source, le dossier views constitue � lui seul le front, tandis que les dossiers models, middlewares, public et controller constituent le back de l'application web.

Par cons�quent, j'envisage apr�s ce premier point d'�tape de recoder mon site afin d'y int�grer React plut�t que express-edge et du scripting sur les pages.
Ceci me permettra �galement d'impl�menter une API REST permettant la liaison entre le back et le front, qui sont dans mon cas peu scind�s.

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


5.DESCRIPTION TECHNIQUE :
Ce projet est compos� d'un back utilisant le framework Express.js (Node), d'un "front" (voir remarque pr�c�dente) g�n�r� par express-edge (voir dossier views comportant des layouts de base et des fichiers edge utilisant ces templates).
React remplacera possiblement express-edge pour constituer un v�ritable front � part enti�re � l'avenir.
La mise en forme des fichiers HTML du site est assur�e par le framework CSS Bootstrap.
Un fichier CSS commun � toute les pages vient se superposer aux fichiers Bootstrap afin de r�gler quelques aspects de mise en forme.
La persistance des donn�es est assur�e par MongoDB (NoSQL); le package mongoose permet la communication back-base de donn�e.
Le traitement du contenu des requ�tes HTTP �chang�es avec le client est r�alis� gr�ce � body-parser.
Les sessions sont mises en place gr�ce au package express-session ; les mots de passe sont crypt�s gr�ce � bcryptjs.
Les sessions sont stor�es dans une collection de la base de donn�es de l'application ; la connexion permettant cette conservation se fait � l'aide du package connect-mongo.
Axios sera utilis� pour effectuer des requ�tes HTTP pr�cises entre clients et application dans le back.
(un custom middleware a �t� mis en place pour emp�cher les clients sans session utilisateur initi�e d'acc�der aux pages des utilisateurs connect�s)

Aucun template HTML ou CSS pr�existant n'a �t� utilis� pour ce site.
Les wireframes inspirant l'apparence du pages du site ont �t� r�alis�es sur papier, faute de temps.
Aucun outil BDD n'a �t� utilis� (pas de traduction des fonctionnalit�s � impl�menter en User Stories faute de temps - c'est sans doute pour cela que la UX semble un peu lourde et pas assez fluide... -)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


6.PROCEDURE D'INSTALLATION DU PROJET :
0) Installer Node, MongoDB et npm si cela n'a jamais �t� fait.
1) Installer les d�pendances (mentionn�es dans les pr�requis techniques) � la racine du projet � l'aide de npm (lancer la commande "npm install nomDuPackage" dans le terminal de l'IDE utilis� - Visual Studio Code de pr�f�rence -).
2) Se d�placer dans le dossier "controller" contenu dans le dossier "pictionary app" (lancer la commande "cd <chemin d'acc�s � pictionary app>\controller" dans le terminal de votre IDE).
3) Lancer la commande "node app.js" dans le terminal de votre IDE (la connexion � la base de donn�es se fait directement dans le code).
(la base de donn�es pictionary-app sera alors cr��e mais sera vide ; voir la section suivante)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


7.PRECHARGEMENT DES DONNEES (reconstitution de la database de test que j'avais constitu�e au fil des utilisations sur mon ordinateur) :
1) Dans le terminal de l'IDE ou de windows, se placer dans le dossier d'installation de MongoDB et naviguer vers le dossier bin contenu dans le dossier MongoDB.
2) Lancer alors les commandes : "mongoimport --db pictionary-app --file <chemin d'acc�s � pictionary app>\database_collections_to_import\<users OU games OU words>.json" pour importer les records de chaque collection que j'avais cr��s lors du d�veloppement du site web
Faire ceci pour chacune des trois collections users, games et words
(3) Visualisation des donn�es de la base de donn�es � l'aide de Robo3T : connexion au "localhost:27017" (port de MongoDB) (bien que l'appli tourne en boucle interne sur le port 3000) ; la d�tection des bases de donn�es host�es en local par MongoDB se fait automatiquement)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


8.DESCRIPTION DES JEUX DE DONNEES (voir le dossier models) :
La base de donn�es pictionary-app se subdivise en 3 collections (4 si l'on compte celle qui stock les sessions des utilisateurs, non export�e).
- La collection users qui recense les records relatifs � chaque utilisateur (y sont indiqu�s : un _id, un username, un password, un email, le niveau de droits conf�r�s i.e. Admin ou Non admin, et la liste des jeux cr��s)
- La collection games qui recense les records relatifs � chaque partie de pictionary ayant �t� cr��e (y sont indiqu�s : un _id, une liste des mots � dessiner utilis�s dans les manches de la partie, une liste des participants i.e. joueurs de la partie, le cr�ateur de la partie, la date de cr�ation de la partie, le nombre de manches de la partie, le nombre maximal de participants dans le lobby, le nom du lobby et le caract�re fini ou non de la partie)
- la collection words qui recense les records relatifs � chaque mot � deviner � une manche (y sont indiqu�s : un _id, le mot en question, une description du mot � deviner, l'auteur de l'ajout du mot et une date d'ajout du mot au "dictionnaire")

Comptes utilisateurs utiles :
- compte de simple user : username = Kikitou, email = kikitou@hotmail.fr, password = mateo98
- compte admin : username = admin, email = admin@gmail.com, password = supersuper

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


9.LISTE DES FONCTIONNALITES PRESENTES DANS LA VERSION LIVREE :
Fonctionnalit�s :
Authentification, gestion de compte et session utilisateur :
- Cr�ation de compte utilisateur
- Modification des param�tres de compte utilisateur (email, password, username)
- Connexion au compte utilisateur
- D�connexion du compte utilisateur

Cat�gories de comptes utilisateurs et gestion des droits (deux types de comptes : admin et simple utilisateur) :
Pour les simple utilisateurs :
- cr�ation de partie de pictionary
- Visualisation de l�historique de partie cr��es
- Visualisation de la liste des parties en cours que l'utilisateur peut rejoindre
- Possibilit� de rejoindre des parties en cours 
Pour les admins :
- ajout de mots au dictionnaire des mots � deviner � chaque manche
- visualisation de toutes les parties (en cours et achev�es)
- possibilit� de supprimer les parties achev�es (manque uniquement la requ�te HTTP pour donner lieu � la suppression en base, � formuler avec axios)

(Une page about est accessible aux visiteurs du site pour expliquer les tenants et aboutissants du site.)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


10.REMARQUES CONCERNANT LA SUITE DE L'IMPLEMENTATION DU PROJET (et ce qui n'a pas pu �tre fini pour clore les deux premiers sprints) :
La page the game pas encore cr��e ; il s'agira d'une page rappelant les r�gles du Pictionary mais �galement les sp�cificit�s du jeu sur ce site (calcul du score, choix du dessinateur,...), ce qui sera d�fini et mis en place au prochain sprint.
Pour achever les sprints 1 et 2, quelques fonctionnalit�s restent � impl�menter (n'ont pas pu l'�tre par manque de temps) : 
- ajout du code js dans app.js et login.edge pour tenir compte du "remember me" dans la session
- ajout d'un script js dans la page register.edge pour rendre effective la v�rification du "confirm password"
- ajout d'un script js dans les pages userInfoModifSimple.edge et userInfoModifAdmin (+ ajout du code permettant la v�rification dans app.js)
- ajout de messages/alertes d'erreur renseignant sur une authentification rat�e (ex : "this username is already used" ou "password confirmation failed" ou encore "this email is linked to another account",...)
- formulation de requ�tes HTTP POST pour supprimer des mots du dictionnaire ou des parties termin�es depuis un compte administrateur ou encore pour modifier des champs du record d'une partie en cours lorsqu'un utilisateur souhaite la rejoindre (utilisation d'axios)

(Enfin existe-il une faille de s�curit� si la gestion des droits se fait uniquement � l'aide d'un champ du mod�le User ? Ne suffit-il pas de modifier directement le champ admin pour le devenir ?)



####################################################################################################################### FIN #################################################################################################################

