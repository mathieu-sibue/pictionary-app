############################################################################################################## MyPictionary ###############################################################################################################
développé par Mathieu Sibué (premier site web, non encore disponible sur une URL)
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
Pour le moment, seuls les sprints 1 et 2 des étapes d'implémentation données en consigne ont été mis en oeuvre.
(Je souhaitais parfaire les deux premiers sprints plutôt que de passer directement au troisième en dépit de son importance.)
De ce fait, la description qui suit concernant la phase de jeu du site MyPictionary définit davantage des lignes directrices que mes réalisations.

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


2.DESCRIPTION DU SITE :
MyPictionary est un site qui permet de jouer au jeu Pictionary en ligne, intégrant un système de comptes utilisateurs. 
Chaque utilisateur peut créer un lobby de jeu ou en rejoindre un ; le créateur de la partie sera le dessinateur pour l'ensemble des manches.
Les autres participants dans le lobby devront deviner les plus vite possible les objets dessinés par le créateur de la partie. 
L'objet à dessiner par le créateur du lobby à chaque manche apparait sur sa fenêtre avec une brève description au début de chaque manche.
Les objets à dessiner dans les manches d'une partie sont déterminés aléatoirement à partir d'une base de données.

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


3.PREREQUIS TECHNIQUES (voir fichier package.js) :
- maîtrise de Git
- maîtrise de npm v6.9.0
- maîtrise de node v12.0.0
- maîtrise du Framework Express.js v4.17.1
- maîtrise de MongoDB, du package mongoose v5.6.11 et du package connect-mongo v3.0.0	
- maîtrise du Framework CSS Bootstrap v4.3.1
- maîtrise du package de templating de fichiers HTML express-edge v1.0.0 et de edge v7.10.1
- maîtrise du package body-parser v1.19.0
- maîtrise du package bcryptjs v2.4.3
- maîtrise du package express-session v1.16.2

(pour finaliser le sprint 2 :
- maîtrise du package axios v0.19.0)

(pour le sprint 3 :
- maîtrise du package socket.io v2.2.0
- maîtrise de l'élément HTML/API canvas
- maîtrise du Framework JS React v16.9.0)

(pour le sprint 4 :
- maîtrise de l'outil de vérification de scripts ESLint v6.5.1
- maîtrise de GitLab CI)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


4.REMARQUES CONCERNANT L'IMPLEMENTATION TECHNIQUE CHOISIE POUR LE PROJET :
Faute de temps, je n'avais pas pu me familiariser avec le framework JS React que je souhaitais utiliser pour ce projet lorsque j'en ai commencé le développement.
(Le développement a débuté en août, ma montée en compétences par l'intermédaire de tutoriels (HTML, CSS, JS,...), de rencontres via mon stage opérateur et de la documentation des frameworks/packages avait débuté fin juin.)
Pour générer des pages web dynamiques, mon choix s'était initialement porté vers l'outil de templating express-edge, très simple d'utilisation.
Il est notamment possible de render une page HTML en utilisant des objets créés dans le back.

Ainsi, je pensais limiter l'utilisation de React uniquement à la phase de jeu, pensant à tort que ce framework ne permettait qu'une manipulation plus aisée du DOM.
Néanmoins, après documentation fin septembre et discussion avec Alexandre Gilles-Lordet et Arnaud Louys (qui vont également suivre le parcours DTY), j'ai réalisé que React était un outil plus puissant qu'un outil de templating.
Mais surtout, son utilisation nécessite une intégration au code dès le début du développement du projet, ce dont je ne m'étais pas rendu compte initialement.
Ainsi, l'architecture de mon projet n'est pas organisée en un dossier FRONT (comportant des fichiers HTML, JS et un fichier js particulier qui tournerait sur un "serveur" pour générer dynamiquement les pages du site) et un dossier BACK (avec les routes, les ressources publiques,...) à faire tourner sur un autre "serveur" (ou VM...).

Influencé par les développeurs avec qui j'avais échangé au cours de mon stage opérateur, j'avais fait le choix d'organiser mon code selon l'architecture MVC (models, views, controllers).
Dans mon code source, le dossier views constitue à lui seul le front, tandis que les dossiers models, middlewares, public et controller constituent le back de l'application web.

Par conséquent, j'envisage après ce premier point d'étape de recoder mon site afin d'y intégrer React plutôt que express-edge et du scripting sur les pages.
Ceci me permettra également d'implémenter une API REST permettant la liaison entre le back et le front, qui sont dans mon cas peu scindés.

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


5.DESCRIPTION TECHNIQUE :
Ce projet est composé d'un back utilisant le framework Express.js (Node), d'un "front" (voir remarque précédente) généré par express-edge (voir dossier views comportant des layouts de base et des fichiers edge utilisant ces templates).
React remplacera possiblement express-edge pour constituer un véritable front à part entière à l'avenir.
La mise en forme des fichiers HTML du site est assurée par le framework CSS Bootstrap.
Un fichier CSS commun à toute les pages vient se superposer aux fichiers Bootstrap afin de régler quelques aspects de mise en forme.
La persistance des données est assurée par MongoDB (NoSQL); le package mongoose permet la communication back-base de donnée.
Le traitement du contenu des requêtes HTTP échangées avec le client est réalisé grâce à body-parser.
Les sessions sont mises en place grâce au package express-session ; les mots de passe sont cryptés grâce à bcryptjs.
Les sessions sont storées dans une collection de la base de données de l'application ; la connexion permettant cette conservation se fait à l'aide du package connect-mongo.
Axios sera utilisé pour effectuer des requêtes HTTP précises entre clients et application dans le back.
(un custom middleware a été mis en place pour empêcher les clients sans session utilisateur initiée d'accéder aux pages des utilisateurs connectés)

Aucun template HTML ou CSS préexistant n'a été utilisé pour ce site.
Les wireframes inspirant l'apparence du pages du site ont été réalisées sur papier, faute de temps.
Aucun outil BDD n'a été utilisé (pas de traduction des fonctionnalités à implémenter en User Stories faute de temps - c'est sans doute pour cela que la UX semble un peu lourde et pas assez fluide... -)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


6.PROCEDURE D'INSTALLATION DU PROJET :
0) Installer Node, MongoDB et npm si cela n'a jamais été fait.
1) Installer les dépendances (mentionnées dans les prérequis techniques) à la racine du projet à l'aide de npm (lancer la commande "npm install nomDuPackage" dans le terminal de l'IDE utilisé - Visual Studio Code de préférence -).
2) Se déplacer dans le dossier "controller" contenu dans le dossier "pictionary app" (lancer la commande "cd <chemin d'accès à pictionary app>\controller" dans le terminal de votre IDE).
3) Lancer la commande "node app.js" dans le terminal de votre IDE (la connexion à la base de données se fait directement dans le code).
(la base de données pictionary-app sera alors créée mais sera vide ; voir la section suivante)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


7.PRECHARGEMENT DES DONNEES (reconstitution de la database de test que j'avais constituée au fil des utilisations sur mon ordinateur) :
1) Dans le terminal de l'IDE ou de windows, se placer dans le dossier d'installation de MongoDB et naviguer vers le dossier bin contenu dans le dossier MongoDB.
2) Lancer alors les commandes : "mongoimport --db pictionary-app --file <chemin d'accès à pictionary app>\database_collections_to_import\<users OU games OU words>.json" pour importer les records de chaque collection que j'avais créés lors du développement du site web
Faire ceci pour chacune des trois collections users, games et words
(3) Visualisation des données de la base de données à l'aide de Robo3T : connexion au "localhost:27017" (port de MongoDB) (bien que l'appli tourne en boucle interne sur le port 3000) ; la détection des bases de données hostées en local par MongoDB se fait automatiquement)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


8.DESCRIPTION DES JEUX DE DONNEES (voir le dossier models) :
La base de données pictionary-app se subdivise en 3 collections (4 si l'on compte celle qui stock les sessions des utilisateurs, non exportée).
- La collection users qui recense les records relatifs à chaque utilisateur (y sont indiqués : un _id, un username, un password, un email, le niveau de droits conférés i.e. Admin ou Non admin, et la liste des jeux créés)
- La collection games qui recense les records relatifs à chaque partie de pictionary ayant été créée (y sont indiqués : un _id, une liste des mots à dessiner utilisés dans les manches de la partie, une liste des participants i.e. joueurs de la partie, le créateur de la partie, la date de création de la partie, le nombre de manches de la partie, le nombre maximal de participants dans le lobby, le nom du lobby et le caractère fini ou non de la partie)
- la collection words qui recense les records relatifs à chaque mot à deviner à une manche (y sont indiqués : un _id, le mot en question, une description du mot à deviner, l'auteur de l'ajout du mot et une date d'ajout du mot au "dictionnaire")

Comptes utilisateurs utiles :
- compte de simple user : username = Kikitou, email = kikitou@hotmail.fr, password = mateo98
- compte admin : username = admin, email = admin@gmail.com, password = supersuper

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


9.LISTE DES FONCTIONNALITES PRESENTES DANS LA VERSION LIVREE :
Fonctionnalités :
Authentification, gestion de compte et session utilisateur :
- Création de compte utilisateur
- Modification des paramètres de compte utilisateur (email, password, username)
- Connexion au compte utilisateur
- Déconnexion du compte utilisateur

Catégories de comptes utilisateurs et gestion des droits (deux types de comptes : admin et simple utilisateur) :
Pour les simple utilisateurs :
- création de partie de pictionary
- Visualisation de l’historique de partie créées
- Visualisation de la liste des parties en cours que l'utilisateur peut rejoindre
- Possibilité de rejoindre des parties en cours 
Pour les admins :
- ajout de mots au dictionnaire des mots à deviner à chaque manche
- visualisation de toutes les parties (en cours et achevées)
- possibilité de supprimer les parties achevées (manque uniquement la requête HTTP pour donner lieu à la suppression en base, à formuler avec axios)

(Une page about est accessible aux visiteurs du site pour expliquer les tenants et aboutissants du site.)

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


10.REMARQUES CONCERNANT LA SUITE DE L'IMPLEMENTATION DU PROJET (et ce qui n'a pas pu être fini pour clore les deux premiers sprints) :
La page the game pas encore créée ; il s'agira d'une page rappelant les règles du Pictionary mais également les spécificités du jeu sur ce site (calcul du score, choix du dessinateur,...), ce qui sera défini et mis en place au prochain sprint.
Pour achever les sprints 1 et 2, quelques fonctionnalités restent à implémenter (n'ont pas pu l'être par manque de temps) : 
- ajout du code js dans app.js et login.edge pour tenir compte du "remember me" dans la session
- ajout d'un script js dans la page register.edge pour rendre effective la vérification du "confirm password"
- ajout d'un script js dans les pages userInfoModifSimple.edge et userInfoModifAdmin (+ ajout du code permettant la vérification dans app.js)
- ajout de messages/alertes d'erreur renseignant sur une authentification ratée (ex : "this username is already used" ou "password confirmation failed" ou encore "this email is linked to another account",...)
- formulation de requêtes HTTP POST pour supprimer des mots du dictionnaire ou des parties terminées depuis un compte administrateur ou encore pour modifier des champs du record d'une partie en cours lorsqu'un utilisateur souhaite la rejoindre (utilisation d'axios)

(Enfin existe-il une faille de sécurité si la gestion des droits se fait uniquement à l'aide d'un champ du modèle User ? Ne suffit-il pas de modifier directement le champ admin pour le devenir ?)



####################################################################################################################### FIN #################################################################################################################

