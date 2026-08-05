@AGENTS.md
APGEPCI
Cahier des charges fonctionnel non technique
Document de cadrage et de validation métier
Version 1.0 — 28 juillet 2026
 
SOMMAIRE
Ce sommaire présente les grandes parties du document.
•	
0.	Objet de ce document
•	
1.	Présentation générale d’APGEPCI
•	
2.	Principes généraux de fonctionnement
•	
3.	Utilisateurs et profils
•	
4.	Parcours général d’une nouvelle entreprise
•	
5.	Gestion de l’organigramme et de la structure fonctionnelle
•	
6.	Cartographie des cycles et processus
•	
7.	Générateur de modèles d’information
•	
8.	Gestion des tables, champs et relations
•	
9.	Formulaires de saisie
•	
10.	Gestion des données
•	
11.	Importation des données
•	
12.	Qualité et fiabilité des données
•	
13.	Gestion des articles, produits, services et marchés
•	
14.	Gestion des clients
•	
15.	Gestion des commerciaux et vendeurs
•	
16.	Gestion des ventes
•	
17.	Gestion des dépenses et charges
•	
18.	Prévisions, réalisations et écarts
•	
19.	Ressources humaines
•	
20.	Achats et approvisionnements
•	
21.	Stockage et inventaire
•	
22.	Production et transformation
•	
23.	Relation client et suivi commercial
•	
24.	Chaîne d’approvisionnement et logistique
•	
25.	Gestion des projets, contrats et marchés
•	
26.	Gestion documentaire
•	
27.	Recherches, filtres et requêtes
•	
28.	États et rapports
•	
29.	Tableaux de bord et indicateurs
•	
30.	Impression et exportation
•	
31.	Droits d’accès et confidentialité
•	
32.	Validations et circuits d’approbation
•	
33.	Collaboration interne
•	
34.	Journal d’audit et traçabilité
•	
35.	Fonctionnement cloud, local et multi-site
•	
36.	Utilisation sur différents appareils
•	
37.	Paramètres de l’entreprise
•	
38.	Administration des secteurs et modèles
•	
39.	Recherche d’aide et assistance utilisateur
•	
40.	Alertes et suivi des anomalies
•	
41.	Fonctions sectorielles proposées
•	
42.	Fonctions non obligatoires à confirmer
•	
43.	Expérience utilisateur attendue
•	
44.	Sauvegarde, continuité et récupération
•	
45.	Propriété et portabilité des données
•	
46.	Scénarios fonctionnels de référence
•	
47.	Périmètre fonctionnel recommandé pour la première version
•	
48.	Critères fonctionnels de réussite
•	
49.	Grille de validation du propriétaire
•	
50.	Questions obligatoires à trancher avant développement
•	
51.	Décisions recommandées avant lancement du développement
•	
52.	Conclusion
•	
53.	Zone de décision finale du propriétaire
 
0. Objet de ce document
Ce document décrit, de manière fonctionnelle et non technique, l’ensemble des fonctionnalités envisagées pour l’application APGEPCI.
Il a pour objectif de permettre au propriétaire du projet de :
•	vérifier que l’application répond réellement à son idée ;
•	confirmer les secteurs d’activité à couvrir ;
•	confirmer les informations à collecter ;
•	valider les modules et les processus métier ;
•	corriger les incompréhensions avant le développement ;
•	identifier les fonctionnalités prioritaires ;
•	distinguer les fonctions obligatoires des fonctions futures ;
•	servir de référence pendant la conception, les tests et la livraison.
Ce document ne décrit pas les langages de programmation, les bases de données, les serveurs, les frameworks ou les choix techniques.
Règle de validation : tout élément présenté comme « proposé », « optionnel » ou « à valider » doit être confirmé par le propriétaire avant d’être considéré comme définitivement inclus.
________________________________________
1. Présentation générale d’APGEPCI
1.1 Vision du produit
APGEPCI est une application de gestion, d’organisation, de modélisation et de pilotage des entreprises, organisations et activités professionnelles.
L’application doit être capable de comprendre progressivement :
•	le type d’entreprise ;
•	son secteur d’activité ;
•	sa structure organisationnelle ;
•	ses services et départements ;
•	ses employés ;
•	ses produits, articles ou services ;
•	ses clients ;
•	ses fournisseurs ;
•	ses activités ;
•	ses processus internes ;
•	ses processus externes ;
•	ses objectifs ;
•	ses dépenses ;
•	ses ventes ;
•	ses achats ;
•	ses stocks ;
•	ses productions ;
•	ses projets ou marchés ;
•	ses besoins de suivi et de reporting.
À partir de ces informations, APGEPCI doit proposer des modèles de gestion adaptés, composés notamment de :
•	tables de données ;
•	formulaires de saisie ;
•	relations entre les informations ;
•	requêtes ;
•	états ;
•	indicateurs ;
•	tableaux de bord ;
•	documents imprimables ;
•	droits d’accès.
L’application doit pouvoir être utilisée aussi bien par une petite structure que par une organisation disposant de plusieurs services, agences, magasins, ateliers ou établissements.
________________________________________
1.2 Problème que l’application doit résoudre
De nombreuses entreprises disposent d’informations dispersées dans :
•	des cahiers ;
•	des fichiers Excel ;
•	des documents Word ;
•	plusieurs téléphones ;
•	différents logiciels non connectés ;
•	des fiches papier ;
•	la mémoire des responsables ;
•	des échanges WhatsApp ;
•	des ordinateurs différents.
Cette dispersion entraîne notamment :
•	des doublons ;
•	des pertes d’informations ;
•	des erreurs de saisie ;
•	une absence d’historique ;
•	des difficultés de contrôle ;
•	des retards dans la prise de décision ;
•	une mauvaise visibilité sur les ventes et les dépenses ;
•	une difficulté à comparer les objectifs et les résultats ;
•	une difficulté à identifier les responsabilités ;
•	une difficulté à produire rapidement des rapports fiables.
APGEPCI doit permettre de centraliser, organiser, relier, contrôler et analyser ces informations.
________________________________________
1.3 Positionnement fonctionnel
APGEPCI doit être considérée comme une plateforme réunissant plusieurs fonctions :
1.	diagnostic organisationnel ;
2.	modélisation des informations ;
3.	configuration des processus ;
4.	gestion des données ;
5.	gestion des activités ;
6.	contrôle des accès ;
7.	analyse des résultats ;
8.	création de rapports ;
9.	impression et exportation ;
10.	pilotage de l’entreprise.
APGEPCI ne doit pas être limitée à un seul secteur ni à un seul modèle de gestion.
________________________________________
2. Principes généraux de fonctionnement
2.1 Application multi-entreprises
APGEPCI doit permettre à plusieurs entreprises d’utiliser la même application tout en conservant leurs données séparées.
Chaque entreprise doit disposer de son propre espace comprenant :
•	son identité ;
•	son logo ;
•	ses utilisateurs ;
•	ses rôles ;
•	ses agences ;
•	ses départements ;
•	ses processus ;
•	ses modèles ;
•	ses données ;
•	ses rapports ;
•	ses paramètres.
Une entreprise ne doit jamais consulter les données d’une autre entreprise, sauf autorisation spécifique de l’administrateur général d’APGEPCI.
________________________________________
2.2 Application multi-secteurs
L’application doit pouvoir être adaptée aux secteurs suivants :
•	pharmacie ;
•	clinique ;
•	cabinet médical ou professionnel ;
•	garage automobile ;
•	mécanique ;
•	cycles et pièces détachées ;
•	menuiserie ;
•	salon de coiffure ;
•	cosmétique ;
•	habillement et vente vestimentaire ;
•	atelier de couture ;
•	centre de formation ;
•	établissement scolaire ;
•	BTP ;
•	imprimerie ;
•	bureautique ;
•	informatique ;
•	commerce général ;
•	métallurgie ;
•	scierie ;
•	briqueterie ;
•	énergie solaire ;
•	import-export ;
•	quincaillerie ;
•	restauration ;
•	café ;
•	bar ;
•	cybercafé ;
•	agroalimentaire ;
•	aviculture ;
•	porciculture ;
•	pisciculture ;
•	embouche bovine ;
•	embouche ovine ;
•	agriculture ;
•	apiculture ;
•	laiterie ;
•	fromagerie ;
•	fruits et légumes ;
•	céréales ;
•	écomatériaux ;
•	tourisme ;
•	hôtellerie ;
•	hébergement ;
•	art et peinture ;
•	associations ;
•	centre culturel ;
•	sécurité et gardiennage ;
•	hydrocarbures ;
•	station-service ;
•	transport ;
•	transit ;
•	forages ;
•	agence de voyage ;
•	sport ;
•	distribution ;
•	autres secteurs ajoutés ultérieurement.
Le propriétaire doit pouvoir ajouter de nouveaux secteurs sans remettre en cause les secteurs existants.
________________________________________
2.3 Adaptation progressive
L’application ne doit pas imposer exactement les mêmes écrans et informations à toutes les entreprises.
Elle doit adapter ses propositions selon :
•	le secteur ;
•	la taille ;
•	le nombre d’employés ;
•	le nombre de sites ;
•	le type d’activité ;
•	les produits ou services ;
•	les processus utilisés ;
•	le niveau de détail souhaité ;
•	les obligations internes de l’entreprise.
________________________________________
2.4 Trois niveaux de modèles proposés
Pour chaque cycle ou processus, APGEPCI doit proposer trois modèles fonctionnels.
Niveau 1 — Modèle essentiel
Destiné aux structures souhaitant une gestion simple.
Il doit contenir :
•	les informations indispensables ;
•	peu de formulaires ;
•	des relations simples ;
•	des états de base ;
•	une prise en main rapide.
Niveau 2 — Modèle opérationnel
Destiné aux structures souhaitant suivre précisément leurs opérations.
Il doit contenir :
•	davantage de données ;
•	des responsabilités ;
•	des statuts ;
•	un historique ;
•	des contrôles ;
•	des états détaillés ;
•	des analyses par période.
Niveau 3 — Modèle avancé de pilotage
Destiné aux structures souhaitant analyser et piloter leurs performances.
Il doit contenir :
•	des objectifs ;
•	des prévisions ;
•	des réalisations ;
•	des écarts ;
•	des indicateurs ;
•	des seuils ;
•	des analyses comparatives ;
•	des tableaux de bord.
L’utilisateur doit pouvoir :
•	prévisualiser chaque modèle ;
•	comparer les modèles ;
•	choisir un modèle ;
•	ajouter ou retirer certaines informations ;
•	faire valider le modèle avant son utilisation.
________________________________________
3. Utilisateurs et profils
3.1 Administrateur général APGEPCI
Il gère l’ensemble de la plateforme.
Il peut notamment :
•	créer ou suspendre une entreprise ;
•	gérer les secteurs ;
•	créer les modèles proposés ;
•	gérer les modules disponibles ;
•	consulter les journaux généraux ;
•	gérer les paramètres globaux ;
•	gérer les abonnements si cette fonction est activée ;
•	intervenir en assistance selon les autorisations ;
•	publier de nouveaux modèles ;
•	archiver des modèles obsolètes.
________________________________________
3.2 Propriétaire ou dirigeant d’entreprise
Il est le responsable principal de l’espace de son entreprise.
Il peut :
•	configurer l’entreprise ;
•	consulter toutes les données autorisées ;
•	créer les utilisateurs ;
•	attribuer des rôles ;
•	valider les modèles ;
•	valider les processus ;
•	consulter les tableaux de bord ;
•	générer les rapports ;
•	contrôler les modifications ;
•	gérer les paramètres de l’entreprise.
________________________________________
3.3 Administrateur de l’entreprise
Il assure la gestion quotidienne de l’espace de l’entreprise.
Il peut, selon ses droits :
•	gérer les utilisateurs ;
•	gérer les services ;
•	gérer les tables et formulaires autorisés ;
•	corriger les données ;
•	gérer les imports ;
•	configurer les rapports ;
•	superviser les accès ;
•	restaurer certaines données supprimées.
________________________________________
3.4 Responsable de service ou de département
Il gère les informations liées à son périmètre.
Exemples :
•	responsable commercial ;
•	responsable RH ;
•	responsable des achats ;
•	responsable de production ;
•	responsable de magasin ;
•	responsable logistique ;
•	responsable d’agence ;
•	chef de projet.
Il peut consulter ou modifier uniquement les données correspondant à son service, son site ou son processus.
________________________________________
3.5 Agent de saisie
Il peut :
•	saisir les données ;
•	modifier les données non validées ;
•	joindre des documents ;
•	consulter les informations utiles à son travail ;
•	soumettre les données à validation.
Il ne peut pas nécessairement supprimer, exporter ou valider.
________________________________________
3.6 Analyste ou contrôleur
Il peut :
•	consulter les données ;
•	exécuter des requêtes ;
•	créer des états ;
•	comparer les périodes ;
•	consulter les indicateurs ;
•	exporter les rapports ;
•	signaler des incohérences.
________________________________________
3.7 Auditeur
Il dispose généralement d’un accès en lecture seule.
Il peut :
•	consulter les données autorisées ;
•	consulter les historiques ;
•	consulter les validations ;
•	consulter les modifications ;
•	générer certains rapports ;
•	examiner les écarts.
________________________________________
3.8 Utilisateur simple
Ses accès sont limités à ses tâches, ses formulaires ou ses propres données.
Exemples :
•	un commercial voit ses clients et ses ventes ;
•	un magasinier voit les mouvements de son magasin ;
•	un enseignant voit ses groupes ou formations ;
•	un salarié voit certaines informations personnelles ;
•	un chef d’équipe voit son équipe.
________________________________________
4. Parcours général d’une nouvelle entreprise
4.1 Création de l’espace entreprise
L’utilisateur doit pouvoir renseigner :
•	la raison sociale ;
•	le nom commercial ;
•	le secteur principal ;
•	les secteurs secondaires ;
•	la forme juridique ;
•	la date de création ;
•	le pays ;
•	la ville ;
•	l’adresse ;
•	les contacts ;
•	le logo ;
•	la devise utilisée ;
•	la langue de travail ;
•	le nombre d’employés ;
•	le nombre de sites ;
•	la taille estimée ;
•	une brève description de l’activité.
________________________________________
4.2 Questionnaire de diagnostic initial
L’application doit proposer un questionnaire progressif.
Les questions doivent permettre de comprendre notamment :
•	ce que l’entreprise vend ;
•	ce qu’elle produit ;
•	ce qu’elle achète ;
•	la manière dont elle stocke ;
•	la manière dont elle facture ;
•	la manière dont elle livre ;
•	les catégories de clients ;
•	le fonctionnement des commerciaux ;
•	l’existence de commissions ;
•	l’existence d’objectifs ;
•	les dépenses suivies ;
•	la gestion des salariés ;
•	l’existence de plusieurs sites ;
•	les projets ou marchés exécutés ;
•	les documents actuellement utilisés ;
•	les rapports attendus ;
•	les difficultés actuelles.
L’utilisateur doit pouvoir :
•	enregistrer le questionnaire en brouillon ;
•	reprendre plus tard ;
•	modifier les réponses ;
•	joindre des documents existants ;
•	faire compléter certaines parties par d’autres responsables.
________________________________________
4.3 Résultat du diagnostic
À la fin du diagnostic, APGEPCI doit afficher une synthèse comprenant :
•	le profil de l’entreprise ;
•	sa structure déclarée ;
•	les processus identifiés ;
•	les modules recommandés ;
•	les informations manquantes ;
•	les modèles de gestion proposés ;
•	les risques de doublons ;
•	les rapports recommandés ;
•	les prochaines étapes de configuration.
Cette synthèse doit pouvoir être :
•	validée ;
•	corrigée ;
•	imprimée ;
•	exportée ;
•	partagée avec un responsable.
________________________________________
5. Gestion de l’organigramme et de la structure fonctionnelle
5.1 Création de l’organigramme
L’entreprise doit pouvoir créer visuellement sa structure.
Elle doit pouvoir ajouter :
•	la direction générale ;
•	les directions ;
•	les départements ;
•	les services ;
•	les unités ;
•	les agences ;
•	les magasins ;
•	les ateliers ;
•	les établissements ;
•	les équipes ;
•	les postes ;
•	les responsables.
________________________________________
5.2 Relations hiérarchiques
L’application doit permettre d’indiquer :
•	qui dépend de qui ;
•	le responsable de chaque structure ;
•	les remplaçants ;
•	les collaborateurs rattachés ;
•	les niveaux de validation ;
•	les liens fonctionnels entre services.
________________________________________
5.3 Fiche d’une unité organisationnelle
Chaque unité doit pouvoir contenir :
•	un nom ;
•	un code ;
•	un type ;
•	un responsable ;
•	une mission ;
•	des objectifs ;
•	des fonctions ;
•	des employés ;
•	des processus associés ;
•	des indicateurs ;
•	un site ;
•	un statut actif ou inactif.
________________________________________
5.4 Affichage de l’organigramme
L’organigramme doit pouvoir être affiché :
•	sous forme d’arbre ;
•	sous forme de liste ;
•	par site ;
•	par département ;
•	par responsable ;
•	par niveau hiérarchique.
Il doit pouvoir être imprimé ou exporté.
________________________________________
6. Cartographie des cycles et processus
6.1 Cycles proposés
L’application doit au minimum proposer les cycles suivants :
•	ressources humaines ;
•	achats et approvisionnements ;
•	production ;
•	stockage ;
•	ventes ;
•	relation client ;
•	chaîne d’approvisionnement ;
•	logistique ;
•	dépenses ;
•	projets et marchés ;
•	gestion documentaire ;
•	maintenance ;
•	qualité ;
•	formation ;
•	administration.
________________________________________
6.2 Description d’un processus
Pour chaque processus, l’entreprise doit pouvoir renseigner :
•	le nom ;
•	l’objectif ;
•	le responsable ;
•	le service concerné ;
•	le point de départ ;
•	les étapes ;
•	les acteurs ;
•	les documents utilisés ;
•	les informations collectées ;
•	les validations nécessaires ;
•	le résultat attendu ;
•	les risques ;
•	les indicateurs ;
•	la fréquence.
________________________________________
6.3 Représentation fonctionnelle
L’application doit permettre de visualiser :
•	les étapes ;
•	l’ordre des étapes ;
•	les acteurs ;
•	les validations ;
•	les documents produits ;
•	les informations entrant dans le processus ;
•	les informations sortant du processus ;
•	les relations avec les autres processus.
________________________________________
6.4 Validation du processus
Un processus doit pouvoir être :
•	en brouillon ;
•	en cours de révision ;
•	soumis à validation ;
•	validé ;
•	rejeté ;
•	archivé.
L’historique des validations doit être conservé.
________________________________________
7. Générateur de modèles d’information
7.1 Objectif
À partir du secteur, de l’organigramme et des processus, APGEPCI doit proposer des ensembles d’informations adaptées à l’entreprise.
Ces ensembles peuvent comprendre :
•	des tables ;
•	des formulaires ;
•	des relations ;
•	des listes ;
•	des états ;
•	des requêtes ;
•	des indicateurs.
________________________________________
7.2 Proposition de 5 à 7 tables par besoin
Pour chaque demande de l’utilisateur, l’application doit pouvoir proposer entre cinq et sept tables ou ensembles d’informations pertinents.
Exemple pour les ventes :
1.	catégories de produits ou services ;
2.	produits ou services ;
3.	clients ;
4.	commerciaux ;
5.	ventes ;
6.	détails des ventes ;
7.	dépenses commerciales.
Exemple pour les ressources humaines :
1.	employés ;
2.	services ;
3.	départements ;
4.	fonctions ;
5.	postes ;
6.	salaires ;
7.	commissions.
________________________________________
7.3 Comparaison de trois modèles
Pour chaque processus, l’utilisateur doit pouvoir comparer trois propositions.
La comparaison doit montrer :
•	les tables incluses ;
•	les informations incluses ;
•	les relations ;
•	les rapports disponibles ;
•	le niveau de détail ;
•	les avantages ;
•	les limites ;
•	les éléments supplémentaires du modèle supérieur.
________________________________________
7.4 Personnalisation du modèle
Avant validation, l’utilisateur doit pouvoir :
•	renommer une table ;
•	renommer un champ ;
•	ajouter un champ ;
•	supprimer un champ proposé non obligatoire ;
•	changer l’ordre des champs ;
•	rendre un champ obligatoire ;
•	rendre un champ facultatif ;
•	ajouter une liste de choix ;
•	demander un code automatique ;
•	créer une relation ;
•	préciser une règle de contrôle ;
•	ajouter une description ;
•	ajouter une aide à la saisie.
________________________________________
7.5 Validation et publication
Un modèle configuré doit pouvoir être :
•	enregistré en brouillon ;
•	testé avec des données fictives ;
•	soumis à un responsable ;
•	validé ;
•	activé ;
•	modifié ultérieurement ;
•	archivé.
L’application doit avertir l’utilisateur lorsqu’une modification risque d’affecter des données déjà enregistrées.
________________________________________
8. Gestion des tables, champs et relations
8.1 Création d’une table fonctionnelle
L’utilisateur autorisé doit pouvoir créer une table destinée à enregistrer un type d’information.
Exemples :
•	clients ;
•	fournisseurs ;
•	salariés ;
•	articles ;
•	véhicules ;
•	machines ;
•	élèves ;
•	formations ;
•	projets ;
•	marchés ;
•	contrats ;
•	dépenses.
________________________________________
8.2 Informations d’une table
Chaque table doit pouvoir comporter :
•	un nom ;
•	un nom au pluriel ;
•	un code ;
•	une description ;
•	un responsable ;
•	un module ;
•	un processus ;
•	des champs ;
•	des règles ;
•	des relations ;
•	des droits ;
•	des états associés.
________________________________________
8.3 Types d’informations saisissables
L’application doit pouvoir gérer notamment :
•	texte court ;
•	texte long ;
•	nombre entier ;
•	nombre décimal ;
•	montant ;
•	pourcentage ;
•	date ;
•	heure ;
•	date et heure ;
•	oui ou non ;
•	liste de choix ;
•	choix multiple ;
•	code automatique ;
•	numéro de référence ;
•	adresse ;
•	téléphone ;
•	adresse électronique ;
•	pièce jointe ;
•	photo ;
•	signature ;
•	statut ;
•	relation vers une autre information ;
•	formule ou résultat calculé.
________________________________________
8.4 Relations entre les tables
L’utilisateur doit pouvoir définir des relations fonctionnelles.
Exemples :
•	un client peut avoir plusieurs ventes ;
•	une vente peut contenir plusieurs articles ;
•	un salarié appartient à un service ;
•	un service appartient à un département ;
•	un produit appartient à une catégorie ;
•	une commande appartient à un fournisseur ;
•	une dépense peut être liée à un projet ;
•	un commercial peut avoir plusieurs objectifs.
________________________________________
8.5 Prévention de la redondance
L’application doit aider à éviter les informations dupliquées.
Elle doit notamment :
•	suggérer de réutiliser une table existante ;
•	signaler les champs similaires ;
•	éviter de demander plusieurs fois la même information ;
•	proposer une relation au lieu d’une copie ;
•	identifier les codes déjà utilisés ;
•	signaler les fiches probablement identiques.
________________________________________
8.6 Dictionnaire des données
APGEPCI doit fournir un dictionnaire consultable présentant :
•	les tables existantes ;
•	les champs ;
•	leur définition ;
•	leur format ;
•	leur caractère obligatoire ;
•	leur origine ;
•	leur responsable ;
•	les relations ;
•	les règles de calcul ;
•	les utilisateurs autorisés.
Ce dictionnaire doit pouvoir être exporté.
________________________________________
9. Formulaires de saisie
9.1 Génération des formulaires
Chaque table doit disposer d’un formulaire permettant d’ajouter ou de modifier des données.
Le formulaire doit être créé à partir des champs validés.
________________________________________
9.2 Organisation des formulaires
Un formulaire doit pouvoir être organisé en :
•	sections ;
•	étapes ;
•	onglets ;
•	groupes de champs ;
•	blocs obligatoires ;
•	blocs facultatifs.
________________________________________
9.3 Comportement des champs
L’application doit pouvoir :
•	afficher ou masquer un champ selon une réponse ;
•	préremplir une information ;
•	calculer automatiquement un résultat ;
•	limiter les choix ;
•	vérifier un format ;
•	empêcher une valeur incohérente ;
•	demander une justification ;
•	imposer une pièce jointe ;
•	afficher une aide.
________________________________________
9.4 Brouillons
L’utilisateur doit pouvoir :
•	commencer une saisie ;
•	enregistrer un brouillon ;
•	reprendre plus tard ;
•	partager le brouillon avec un collègue ;
•	soumettre le formulaire à validation.
________________________________________
9.5 Contrôle avant enregistrement
Avant validation, l’application doit signaler :
•	les champs manquants ;
•	les formats incorrects ;
•	les doublons potentiels ;
•	les valeurs incohérentes ;
•	les relations manquantes ;
•	les justificatifs absents.
________________________________________
10. Gestion des données
10.1 Ajout
Les utilisateurs autorisés doivent pouvoir ajouter de nouvelles informations.
Chaque ajout doit indiquer :
•	l’auteur ;
•	la date ;
•	l’heure ;
•	le statut ;
•	l’entreprise ;
•	le service ou site concerné, si nécessaire.
________________________________________
10.2 Consultation
Les données doivent pouvoir être consultées :
•	sous forme de tableau ;
•	sous forme de fiche ;
•	sous forme de liste ;
•	sous forme de cartes ;
•	dans un calendrier ;
•	dans un tableau de bord ;
•	à travers une recherche.
________________________________________
10.3 Modification
Les utilisateurs autorisés doivent pouvoir modifier les données.
L’application doit conserver :
•	la valeur précédente ;
•	la nouvelle valeur ;
•	l’auteur de la modification ;
•	la date ;
•	le motif, lorsque nécessaire.
________________________________________
10.4 Suppression
La suppression doit être contrôlée.
Selon les droits, une donnée peut être :
•	supprimée ;
•	archivée ;
•	désactivée ;
•	placée dans une corbeille ;
•	restaurée.
Les données importantes déjà utilisées dans des ventes, rapports, paiements ou documents ne doivent pas être supprimées sans avertissement.
________________________________________
10.5 Mise à jour en masse
Les utilisateurs autorisés doivent pouvoir modifier plusieurs données à la fois.
Exemples :
•	changer le statut de plusieurs articles ;
•	affecter plusieurs salariés à un service ;
•	mettre à jour plusieurs prix ;
•	archiver plusieurs clients inactifs.
Une prévisualisation doit être affichée avant validation.
________________________________________
10.6 Historique
Chaque fiche importante doit afficher :
•	sa date de création ;
•	ses modifications ;
•	ses validations ;
•	ses annulations ;
•	ses pièces jointes ;
•	ses commentaires ;
•	ses responsables successifs.
________________________________________
11. Importation des données
11.1 Formats acceptés
L’application doit permettre d’importer des données à partir de :
•	fichiers Excel ;
•	fichiers CSV ;
•	modèles de fichiers fournis par APGEPCI ;
•	copier-coller de tableaux ;
•	autres sources validées ultérieurement.
________________________________________
11.2 Assistant d’importation
L’importation doit suivre plusieurs étapes :
1.	choix du type de données ;
2.	téléchargement du fichier ;
3.	correspondance des colonnes ;
4.	vérification des formats ;
5.	détection des doublons ;
6.	prévisualisation ;
7.	confirmation ;
8.	rapport final.
________________________________________
11.3 Gestion des erreurs
L’application doit indiquer clairement :
•	la ligne concernée ;
•	la colonne concernée ;
•	l’erreur détectée ;
•	la correction attendue ;
•	les lignes acceptées ;
•	les lignes rejetées.
L’utilisateur doit pouvoir télécharger un rapport des erreurs.
________________________________________
11.4 Annulation d’un import
Un import récent doit pouvoir être annulé par un utilisateur autorisé, lorsque cela ne compromet pas d’autres opérations déjà réalisées.
________________________________________
12. Qualité et fiabilité des données
12.1 Détection des doublons
L’application doit détecter les doublons potentiels concernant notamment :
•	clients ;
•	fournisseurs ;
•	employés ;
•	articles ;
•	produits ;
•	services ;
•	factures ;
•	ventes ;
•	codes ;
•	numéros de téléphone ;
•	adresses électroniques.
________________________________________
12.2 Fusion de fiches
Un utilisateur autorisé doit pouvoir fusionner deux fiches identiques.
Avant fusion, l’application doit montrer :
•	les différences ;
•	les informations qui seront conservées ;
•	les relations rattachées ;
•	les documents concernés.
________________________________________
12.3 Contrôles de cohérence
Exemples de contrôles :
•	une date de fin ne peut pas précéder une date de début ;
•	une quantité ne peut pas être négative, sauf exception autorisée ;
•	un code doit être unique ;
•	une vente doit être liée à un client lorsque cela est obligatoire ;
•	un salarié doit être lié à un service actif ;
•	une dépense doit avoir une catégorie ;
•	une réalisation ne doit pas être comptée deux fois.
________________________________________
12.4 Signalement des données incomplètes
L’application doit pouvoir afficher :
•	les fiches incomplètes ;
•	les informations expirées ;
•	les documents manquants ;
•	les données non validées ;
•	les anomalies à corriger.
________________________________________
13. Gestion des articles, produits, services et marchés
13.1 Catégories
L’entreprise doit pouvoir gérer :
•	les catégories ;
•	les sous-catégories ;
•	les familles ;
•	les gammes ;
•	les marques ;
•	les types de services ;
•	les types de marchés ;
•	les unités de mesure.
________________________________________
13.2 Fiche article, produit ou service
La fiche doit pouvoir contenir :
•	un code ;
•	une désignation ;
•	une description ;
•	une catégorie ;
•	une unité ;
•	un prix d’achat ;
•	un coût ;
•	un prix de vente ;
•	un taux applicable ;
•	une image ;
•	un fournisseur principal ;
•	un statut ;
•	une date de création ;
•	des documents ;
•	des caractéristiques propres au secteur.
________________________________________
13.3 Codes d’identification
L’application doit permettre :
•	la saisie manuelle d’un code ;
•	la génération automatique ;
•	la définition d’un format ;
•	la détection des doublons ;
•	la recherche par code ;
•	l’impression d’un code lorsque nécessaire.
________________________________________
13.4 Tarification
L’entreprise doit pouvoir gérer :
•	le prix standard ;
•	les prix par catégorie de client ;
•	les prix par période ;
•	les tarifs promotionnels ;
•	les prix négociés ;
•	les prix par site ;
•	les coûts ;
•	les historiques de prix.
________________________________________
14. Gestion des clients
14.1 Fiche client
La fiche client doit pouvoir contenir :
•	un code client ;
•	un type de client ;
•	un nom ou une raison sociale ;
•	un contact principal ;
•	un téléphone ;
•	une adresse électronique ;
•	une adresse ;
•	une ville ;
•	un secteur ;
•	un commercial responsable ;
•	une catégorie ;
•	une date de début de relation ;
•	un statut ;
•	des pièces jointes ;
•	des notes ;
•	un historique.
________________________________________
14.2 Historique client
L’application doit permettre de consulter :
•	les ventes ;
•	les commandes ;
•	les paiements enregistrés ;
•	les projets ;
•	les marchés ;
•	les réclamations ;
•	les échanges ;
•	les relances ;
•	les documents ;
•	les responsables successifs.
________________________________________
14.3 Segmentation
Les clients doivent pouvoir être classés selon :
•	le type ;
•	la zone ;
•	le chiffre d’affaires ;
•	la fréquence d’achat ;
•	le commercial ;
•	le secteur ;
•	le statut ;
•	le niveau de fidélité ;
•	le risque ;
•	des catégories personnalisées.
________________________________________
15. Gestion des commerciaux et vendeurs
15.1 Fiche commercial
Elle doit comprendre :
•	un code ;
•	l’identité ;
•	la fonction ;
•	le service ;
•	le site ;
•	la zone ;
•	les catégories de produits ;
•	les clients affectés ;
•	les objectifs ;
•	les ventes ;
•	les commissions ;
•	le statut.
________________________________________
15.2 Affectations
L’application doit permettre d’affecter un commercial à :
•	une zone ;
•	une agence ;
•	un portefeuille de clients ;
•	une gamme de produits ;
•	un marché ;
•	une équipe ;
•	une période.
________________________________________
15.3 Performance commerciale
L’application doit pouvoir afficher :
•	le chiffre d’affaires ;
•	le nombre de ventes ;
•	le nombre de clients actifs ;
•	les nouveaux clients ;
•	les objectifs ;
•	les réalisations ;
•	les écarts ;
•	les commissions ;
•	les dépenses liées ;
•	les classements.
________________________________________
16. Gestion des ventes
16.1 Enregistrement d’une vente
Une vente doit pouvoir contenir :
•	une référence ;
•	une date ;
•	un client ;
•	un commercial ;
•	un site ;
•	des articles ou services ;
•	les quantités ;
•	les prix ;
•	les remises ;
•	les taxes ;
•	les dépenses liées ;
•	le montant total ;
•	le statut ;
•	les justificatifs ;
•	les observations.
________________________________________
16.2 Statuts de vente
Les statuts proposés peuvent être :
•	brouillon ;
•	en attente ;
•	validée ;
•	livrée ;
•	partiellement livrée ;
•	annulée ;
•	clôturée.
Ces statuts doivent être confirmés selon le fonctionnement du propriétaire.
________________________________________
16.3 Ventes par période
L’application doit produire les ventes :
•	journalières ;
•	hebdomadaires ;
•	mensuelles ;
•	trimestrielles ;
•	semestrielles ;
•	annuelles ;
•	sur une période personnalisée.
________________________________________
16.4 Analyses des ventes
L’application doit permettre d’analyser les ventes :
•	par article ;
•	par catégorie ;
•	par client ;
•	par commercial ;
•	par service ;
•	par agence ;
•	par zone ;
•	par période ;
•	par marché ;
•	par mode de vente ;
•	par statut.
________________________________________
16.5 Annulation et correction
Une vente validée ne doit pas être modifiée sans traçabilité.
Selon les droits, l’utilisateur doit pouvoir :
•	demander une correction ;
•	annuler ;
•	enregistrer un motif ;
•	conserver l’ancienne version ;
•	faire valider la correction.
________________________________________
17. Gestion des dépenses et charges
17.1 Catégories de dépenses
L’entreprise doit pouvoir gérer :
•	dépenses commerciales ;
•	transport ;
•	carburant ;
•	communication ;
•	publicité ;
•	commissions ;
•	fournitures ;
•	entretien ;
•	déplacements ;
•	sous-traitance ;
•	dépenses de projet ;
•	autres charges.
________________________________________
17.2 Enregistrement d’une dépense
Une dépense doit pouvoir contenir :
•	une référence ;
•	une date ;
•	une catégorie ;
•	un montant ;
•	un bénéficiaire ;
•	un service ;
•	un projet ou marché ;
•	un commercial ;
•	une vente liée ;
•	une pièce justificative ;
•	un mode de règlement ;
•	un statut ;
•	une observation.
________________________________________
17.3 Validation
Selon le montant ou la catégorie, une dépense peut nécessiter :
•	une demande ;
•	un justificatif ;
•	l’avis d’un responsable ;
•	une validation ;
•	un rejet ;
•	une correction.
________________________________________
17.4 Analyses
L’application doit pouvoir afficher :
•	les dépenses par période ;
•	par catégorie ;
•	par service ;
•	par commercial ;
•	par projet ;
•	par agence ;
•	les dépenses prévues ;
•	les dépenses réalisées ;
•	les écarts ;
•	les dépenses sans justificatif.
________________________________________
18. Prévisions, réalisations et écarts
18.1 Prévisions
L’application doit permettre de créer des prévisions concernant :
•	ventes ;
•	achats ;
•	dépenses ;
•	production ;
•	recrutements ;
•	stocks ;
•	projets ;
•	marchés ;
•	chiffre d’affaires ;
•	quantités ;
•	objectifs commerciaux.
________________________________________
18.2 Périodes
Les prévisions doivent pouvoir être définies par :
•	jour ;
•	semaine ;
•	mois ;
•	trimestre ;
•	semestre ;
•	année ;
•	période personnalisée.
________________________________________
18.3 Réalisations
Les réalisations doivent être calculées à partir des données validées ou saisies manuellement lorsque nécessaire.
________________________________________
18.4 Écarts
L’application doit faire ressortir :
•	l’écart en valeur ;
•	l’écart en pourcentage ;
•	l’écart favorable ;
•	l’écart défavorable ;
•	l’évolution par rapport à la période précédente ;
•	le taux de réalisation.
________________________________________
18.5 Explication des écarts
Les responsables doivent pouvoir :
•	commenter un écart ;
•	indiquer une cause ;
•	joindre un justificatif ;
•	proposer une action corrective ;
•	désigner un responsable ;
•	fixer une échéance ;
•	suivre l’avancement.
________________________________________
19. Ressources humaines
19.1 Fiche salarié ou employé
Elle doit pouvoir contenir :
•	un matricule ;
•	l’identité ;
•	la date de naissance ;
•	le sexe, si l’entreprise est autorisée à le collecter ;
•	les coordonnées ;
•	la date d’embauche ;
•	le service ;
•	le département ;
•	la fonction ;
•	le poste ;
•	le responsable ;
•	le site ;
•	le type de contrat ;
•	le salaire ;
•	la commission ;
•	le statut ;
•	les documents ;
•	l’historique des affectations.
________________________________________
19.2 Gestion des fonctions et postes
L’application doit permettre de définir :
•	les fonctions ;
•	les postes ;
•	les missions ;
•	les responsabilités ;
•	les compétences attendues ;
•	le nombre de postes ;
•	le service ;
•	le niveau hiérarchique ;
•	le responsable.
________________________________________
19.3 Effectifs
L’application doit afficher :
•	le nombre total de salariés ;
•	les effectifs par service ;
•	les effectifs par fonction ;
•	les effectifs par site ;
•	les postes vacants ;
•	les salariés actifs ;
•	les départs ;
•	les nouvelles entrées.
________________________________________
19.4 Salaires et commissions
L’application doit permettre de suivre :
•	le salaire de base ;
•	les primes ;
•	les commissions ;
•	les retenues ;
•	les évolutions ;
•	les périodes ;
•	les règles de calcul validées ;
•	les justificatifs.
La gestion complète de la paie doit être confirmée séparément. Le suivi des salaires ne signifie pas automatiquement que l’application calculera toutes les obligations légales de paie.
________________________________________
20. Achats et approvisionnements
20.1 Fournisseurs
La fiche fournisseur doit pouvoir contenir :
•	un code ;
•	la raison sociale ;
•	les contacts ;
•	l’adresse ;
•	les produits fournis ;
•	les conditions ;
•	les délais ;
•	le statut ;
•	les documents ;
•	l’historique.
________________________________________
20.2 Demandes d’achat
Un utilisateur doit pouvoir créer une demande d’achat avec :
•	les articles ou services ;
•	les quantités ;
•	le besoin ;
•	la date souhaitée ;
•	le service demandeur ;
•	le projet ;
•	le niveau d’urgence ;
•	les justificatifs.
________________________________________
20.3 Validation des achats
Une demande peut être :
•	créée ;
•	soumise ;
•	approuvée ;
•	rejetée ;
•	transformée en commande ;
•	reçue ;
•	clôturée.
________________________________________
20.4 Commandes fournisseurs
L’application doit permettre d’enregistrer :
•	le fournisseur ;
•	les articles ;
•	les quantités ;
•	les prix ;
•	les délais ;
•	le site de livraison ;
•	les conditions ;
•	les justificatifs ;
•	le statut.
________________________________________
20.5 Réceptions
Lors de la réception, l’utilisateur doit pouvoir indiquer :
•	les quantités reçues ;
•	les quantités manquantes ;
•	les produits endommagés ;
•	les écarts ;
•	la date ;
•	le réceptionnaire ;
•	les observations ;
•	les documents.
________________________________________
20.6 Analyses des achats
L’application doit fournir :
•	les achats par fournisseur ;
•	les achats par article ;
•	les achats par période ;
•	les commandes en attente ;
•	les retards ;
•	les écarts ;
•	les dépenses prévues et réalisées ;
•	les performances fournisseurs.
________________________________________
21. Stockage et inventaire
21.1 Sites de stockage
L’entreprise doit pouvoir gérer :
•	magasins ;
•	dépôts ;
•	entrepôts ;
•	réserves ;
•	emplacements ;
•	véhicules de stockage ;
•	sites temporaires.
________________________________________
21.2 Mouvements de stock
L’application doit permettre d’enregistrer :
•	entrée ;
•	sortie ;
•	transfert ;
•	retour ;
•	correction ;
•	perte ;
•	casse ;
•	consommation ;
•	production ;
•	inventaire.
________________________________________
21.3 Consultation du stock
L’utilisateur doit pouvoir connaître :
•	la quantité disponible ;
•	la quantité réservée ;
•	la quantité en transit ;
•	le stock par site ;
•	le stock par article ;
•	le stock par lot ;
•	le stock proche de l’expiration ;
•	le stock sous le seuil.
________________________________________
21.4 Inventaire
L’application doit permettre :
•	de préparer un inventaire ;
•	de choisir un magasin ;
•	de saisir les quantités comptées ;
•	de comparer avec les quantités attendues ;
•	de faire ressortir les écarts ;
•	de justifier les écarts ;
•	de faire valider les corrections ;
•	d’imprimer le procès-verbal.
________________________________________
21.5 Alertes
L’application doit pouvoir signaler :
•	stock faible ;
•	rupture ;
•	surstock ;
•	expiration proche ;
•	mouvement inhabituel ;
•	article sans mouvement ;
•	différence d’inventaire.
________________________________________
22. Production et transformation
22.1 Produits fabriqués
L’entreprise doit pouvoir définir :
•	les produits finis ;
•	les matières premières ;
•	les composants ;
•	les recettes ;
•	les nomenclatures ;
•	les unités ;
•	les rendements attendus.
________________________________________
22.2 Ordres de production
Un ordre de production doit pouvoir contenir :
•	le produit ;
•	la quantité prévue ;
•	la date ;
•	l’atelier ;
•	le responsable ;
•	les matières prévues ;
•	les coûts prévus ;
•	le statut.
________________________________________
22.3 Réalisation de production
L’utilisateur doit pouvoir saisir :
•	la quantité produite ;
•	les matières consommées ;
•	les pertes ;
•	les rebuts ;
•	le temps passé ;
•	les responsables ;
•	les incidents ;
•	les observations.
________________________________________
22.4 Contrôle de production
L’application doit faire ressortir :
•	prévu contre réalisé ;
•	consommation prévue contre réelle ;
•	pertes ;
•	rendement ;
•	coût ;
•	quantité conforme ;
•	quantité rejetée ;
•	causes des écarts.
________________________________________
23. Relation client et suivi commercial
23.1 Prospects
L’application doit permettre de gérer :
•	les prospects ;
•	leur origine ;
•	leurs besoins ;
•	leur potentiel ;
•	leur responsable ;
•	leur statut ;
•	les prochaines actions.
________________________________________
23.2 Interactions
Les utilisateurs doivent pouvoir enregistrer :
•	appels ;
•	réunions ;
•	visites ;
•	messages ;
•	courriers ;
•	réclamations ;
•	propositions ;
•	relances.
________________________________________
23.3 Opportunités
Une opportunité doit pouvoir comporter :
•	le prospect ou client ;
•	le besoin ;
•	la valeur estimée ;
•	la probabilité ;
•	l’étape ;
•	le commercial ;
•	la date attendue ;
•	les actions ;
•	le résultat.
________________________________________
23.4 Réclamations
L’application doit permettre :
•	l’enregistrement ;
•	l’affectation ;
•	le suivi ;
•	la priorité ;
•	le délai ;
•	la réponse ;
•	la clôture ;
•	l’analyse des causes.
________________________________________
24. Chaîne d’approvisionnement et logistique
24.1 Suivi des flux
L’application doit permettre de suivre les flux entre :
•	fournisseur ;
•	transporteur ;
•	entrepôt ;
•	agence ;
•	client ;
•	site de production.
________________________________________
24.2 Expéditions et livraisons
Une expédition doit pouvoir contenir :
•	une référence ;
•	un point de départ ;
•	une destination ;
•	un transporteur ;
•	un conducteur ;
•	un véhicule ;
•	les marchandises ;
•	les quantités ;
•	la date prévue ;
•	la date réelle ;
•	le statut ;
•	les incidents.
________________________________________
24.3 Performance logistique
L’application doit pouvoir afficher :
•	les livraisons à temps ;
•	les retards ;
•	les coûts ;
•	les incidents ;
•	les écarts de quantité ;
•	les transporteurs les plus performants ;
•	les commandes en transit.
________________________________________
25. Gestion des projets, contrats et marchés
25.1 Fiche projet ou marché
Elle doit pouvoir contenir :
•	un code ;
•	un intitulé ;
•	un client ;
•	un responsable ;
•	une date de début ;
•	une date de fin ;
•	un budget ;
•	des objectifs ;
•	des étapes ;
•	des livrables ;
•	des dépenses ;
•	des recettes ;
•	des documents ;
•	un statut.
________________________________________
25.2 Suivi d’avancement
L’application doit permettre de suivre :
•	les tâches ;
•	les responsables ;
•	les échéances ;
•	le taux d’avancement ;
•	les retards ;
•	les blocages ;
•	les validations ;
•	les livrables.
________________________________________
25.3 Suivi financier
L’application doit faire ressortir :
•	budget prévu ;
•	dépenses réalisées ;
•	recettes ;
•	marge ;
•	reste à engager ;
•	écart ;
•	dépenses par catégorie ;
•	résultat final.
________________________________________
26. Gestion documentaire
26.1 Documents pris en charge
L’application doit permettre de joindre notamment :
•	contrats ;
•	factures ;
•	reçus ;
•	devis ;
•	bons ;
•	rapports ;
•	attestations ;
•	photos ;
•	pièces d’identité ;
•	diplômes ;
•	certificats ;
•	fichiers Excel ;
•	documents Word ;
•	PDF.
________________________________________
26.2 Classement
Les documents doivent pouvoir être classés par :
•	entreprise ;
•	module ;
•	client ;
•	fournisseur ;
•	salarié ;
•	projet ;
•	vente ;
•	achat ;
•	catégorie ;
•	date ;
•	confidentialité.
________________________________________
26.3 Versions
L’application doit conserver les versions d’un document lorsque celui-ci est remplacé.
________________________________________
26.4 Expiration
L’application doit pouvoir signaler les documents arrivant à expiration.
________________________________________
27. Recherches, filtres et requêtes
27.1 Recherche générale
L’utilisateur doit pouvoir rechercher rapidement :
•	un client ;
•	un employé ;
•	un article ;
•	une vente ;
•	un fournisseur ;
•	un document ;
•	un projet ;
•	un code ;
•	une référence.
________________________________________
27.2 Filtres
Les listes doivent pouvoir être filtrées par :
•	période ;
•	statut ;
•	service ;
•	site ;
•	responsable ;
•	catégorie ;
•	montant ;
•	client ;
•	fournisseur ;
•	commercial ;
•	texte ;
•	champs personnalisés.
________________________________________
27.3 Requêtes enregistrées
L’utilisateur doit pouvoir :
•	choisir les informations à afficher ;
•	définir les critères ;
•	définir les regroupements ;
•	définir les tris ;
•	enregistrer la requête ;
•	la réutiliser ;
•	la partager ;
•	la rendre privée ;
•	l’exporter.
________________________________________
27.4 Types de requêtes minimum
APGEPCI doit proposer au minimum :
1.	recherche détaillée ;
2.	regroupement et total ;
3.	classement ;
4.	comparaison entre périodes ;
5.	prévision contre réalisation ;
6.	analyse des écarts ;
7.	analyse des dépenses ;
8.	analyse des marges ;
9.	détection d’anomalies ;
10.	analyse croisée.
________________________________________
28. États et rapports
28.1 Création d’un état
L’utilisateur autorisé doit pouvoir choisir :
•	le titre ;
•	les données ;
•	les colonnes ;
•	les filtres ;
•	les regroupements ;
•	les totaux ;
•	la période ;
•	le logo ;
•	les signatures ;
•	les observations ;
•	le format.
________________________________________
28.2 États standards
L’application doit proposer notamment :
•	liste des clients ;
•	liste des articles ;
•	ventes par période ;
•	ventes par client ;
•	ventes par commercial ;
•	ventes par catégorie ;
•	dépenses par période ;
•	dépenses par service ;
•	prévisions et réalisations ;
•	écarts ;
•	effectifs ;
•	salaires ;
•	commissions ;
•	achats ;
•	stocks ;
•	inventaires ;
•	production ;
•	projets ;
•	documents expirant.
________________________________________
28.3 États personnalisés
L’entreprise doit pouvoir créer ses propres états à partir des données autorisées.
________________________________________
28.4 Programmation des rapports
Fonction proposée à valider :
•	génération automatique ;
•	fréquence quotidienne ;
•	hebdomadaire ;
•	mensuelle ;
•	trimestrielle ;
•	annuelle ;
•	envoi aux responsables ;
•	archivage.
________________________________________
29. Tableaux de bord et indicateurs
29.1 Tableau de bord général
Le dirigeant doit pouvoir consulter :
•	les chiffres clés ;
•	les alertes ;
•	les écarts ;
•	les activités récentes ;
•	les tâches en retard ;
•	les validations en attente ;
•	les tendances ;
•	les performances par service.
________________________________________
29.2 Tableaux de bord par métier
L’application doit proposer des tableaux de bord pour :
•	direction ;
•	ventes ;
•	ressources humaines ;
•	achats ;
•	stock ;
•	production ;
•	CRM ;
•	logistique ;
•	projets ;
•	finances opérationnelles.
________________________________________
29.3 Indicateurs personnalisés
L’utilisateur autorisé doit pouvoir définir :
•	le nom ;
•	l’objectif ;
•	la source des données ;
•	la période ;
•	la méthode de calcul ;
•	la cible ;
•	le seuil d’alerte ;
•	le responsable ;
•	le mode d’affichage.
________________________________________
29.4 Affichages possibles
Les indicateurs peuvent être présentés sous forme de :
•	nombre ;
•	pourcentage ;
•	tableau ;
•	courbe ;
•	histogramme ;
•	classement ;
•	progression ;
•	alerte ;
•	comparaison.
________________________________________
30. Impression et exportation
30.1 Formats
L’application doit permettre l’exportation en :
•	PDF ;
•	Word ;
•	Excel ;
•	CSV ;
•	impression directe.
________________________________________
30.2 Mise en page
L’utilisateur doit pouvoir choisir :
•	portrait ;
•	paysage ;
•	format de page ;
•	logo ;
•	titre ;
•	en-tête ;
•	pied de page ;
•	numérotation ;
•	date ;
•	signatures ;
•	cachet ;
•	colonnes visibles.
________________________________________
30.3 Contenus exportables
Doivent pouvoir être exportés :
•	tables ;
•	listes ;
•	fiches ;
•	états ;
•	requêtes ;
•	tableaux de bord ;
•	organigramme ;
•	dictionnaire des données ;
•	historiques ;
•	rapports de diagnostic.
________________________________________
30.4 Historique des exports
L’application doit pouvoir enregistrer :
•	l’auteur ;
•	la date ;
•	le type de document ;
•	les filtres utilisés ;
•	le format ;
•	le destinataire éventuel.
________________________________________
31. Droits d’accès et confidentialité
31.1 Gestion par rôle
L’administrateur doit pouvoir créer des rôles personnalisés.
Exemples :
•	direction ;
•	responsable RH ;
•	responsable commercial ;
•	magasinier ;
•	comptable ;
•	commercial ;
•	agent de saisie ;
•	auditeur ;
•	lecteur.
________________________________________
31.2 Types d’autorisation
Pour chaque module, table ou action, les droits doivent pouvoir préciser :
•	voir ;
•	ajouter ;
•	modifier ;
•	supprimer ;
•	archiver ;
•	valider ;
•	rejeter ;
•	importer ;
•	exporter ;
•	imprimer ;
•	partager ;
•	consulter l’historique ;
•	voir les montants ;
•	voir les salaires ;
•	administrer.
________________________________________
31.3 Limitation par périmètre
Les accès doivent pouvoir être limités à :
•	ses propres données ;
•	son équipe ;
•	son service ;
•	son département ;
•	son agence ;
•	son magasin ;
•	son site ;
•	son projet ;
•	l’ensemble de l’entreprise.
________________________________________
31.4 Données sensibles
Certaines données doivent pouvoir être marquées comme sensibles.
Exemples :
•	salaires ;
•	documents d’identité ;
•	données médicales ;
•	montants confidentiels ;
•	contrats ;
•	informations disciplinaires.
Seuls les utilisateurs autorisés doivent pouvoir les consulter.
________________________________________
32. Validations et circuits d’approbation
32.1 Éléments pouvant nécessiter une validation
•	dépenses ;
•	achats ;
•	corrections ;
•	ventes annulées ;
•	changements de prix ;
•	nouveaux fournisseurs ;
•	nouveaux employés ;
•	imports ;
•	écarts d’inventaire ;
•	rapports ;
•	modèles ;
•	processus.
________________________________________
32.2 Niveaux de validation
L’application doit permettre un ou plusieurs niveaux.
Exemple :
1.	agent de saisie ;
2.	responsable de service ;
3.	directeur ;
4.	validation finale.
________________________________________
32.3 Actions du validateur
Le validateur doit pouvoir :
•	approuver ;
•	rejeter ;
•	demander une correction ;
•	ajouter un commentaire ;
•	joindre un document ;
•	déléguer ;
•	consulter l’historique.
________________________________________
33. Collaboration interne
33.1 Commentaires
Les utilisateurs doivent pouvoir commenter une fiche ou une opération selon leurs droits.
________________________________________
33.2 Mentions
Un utilisateur doit pouvoir mentionner un collègue pour attirer son attention.
________________________________________
33.3 Tâches
Il doit être possible de créer une tâche avec :
•	un titre ;
•	un responsable ;
•	une échéance ;
•	une priorité ;
•	un lien vers une fiche ;
•	un statut ;
•	un commentaire.
________________________________________
33.4 Notifications
L’application doit pouvoir notifier :
•	nouvelle tâche ;
•	validation demandée ;
•	rejet ;
•	document expirant ;
•	stock faible ;
•	retard ;
•	anomalie ;
•	import terminé ;
•	objectif non atteint ;
•	nouvelle affectation.
________________________________________
34. Journal d’audit et traçabilité
34.1 Actions enregistrées
L’application doit enregistrer notamment :
•	connexions ;
•	créations ;
•	modifications ;
•	suppressions ;
•	restaurations ;
•	validations ;
•	rejets ;
•	imports ;
•	exports ;
•	changements de droits ;
•	changements de modèles ;
•	téléchargements sensibles.
________________________________________
34.2 Consultation
Les utilisateurs autorisés doivent pouvoir filtrer l’historique par :
•	utilisateur ;
•	date ;
•	action ;
•	module ;
•	type de donnée ;
•	entreprise ;
•	service ;
•	niveau de risque.
________________________________________
34.3 Justification
Pour certaines actions sensibles, l’application doit exiger un motif.
________________________________________
35. Fonctionnement cloud, local et multi-site
35.1 Version cloud
L’application doit pouvoir être utilisée en ligne depuis un navigateur.
________________________________________
35.2 Version sur serveur privé
Une organisation doit pouvoir disposer d’un espace privé géré séparément.
________________________________________
35.3 Version locale
L’application doit pouvoir, selon l’offre prévue, être utilisée sur un serveur local de l’entreprise.
________________________________________
35.4 Accès multi-site
Une même entreprise doit pouvoir gérer :
•	plusieurs agences ;
•	plusieurs magasins ;
•	plusieurs établissements ;
•	plusieurs entrepôts ;
•	plusieurs ateliers ;
•	plusieurs pays ou villes, si nécessaire.
Les droits et rapports doivent pouvoir être séparés ou consolidés.
________________________________________
35.5 Mode hybride — à valider
Fonction avancée proposée :
•	travailler localement ;
•	synchroniser avec le cloud ;
•	gérer les interruptions ;
•	signaler les conflits ;
•	reprendre la synchronisation.
Cette fonctionnalité doit faire l’objet d’une validation et d’un périmètre séparés.
________________________________________
36. Utilisation sur différents appareils
L’application doit être utilisable sur :
•	ordinateur de bureau ;
•	ordinateur portable ;
•	tablette ;
•	téléphone.
Les fonctions principales doivent rester accessibles sur les petits écrans.
Certaines opérations complexes, comme la configuration des modèles, peuvent être optimisées principalement pour ordinateur.
________________________________________
37. Paramètres de l’entreprise
L’entreprise doit pouvoir configurer :
•	son logo ;
•	ses couleurs ;
•	sa devise ;
•	sa langue ;
•	son fuseau horaire ;
•	son exercice ;
•	ses formats de date ;
•	ses formats de numérotation ;
•	ses références ;
•	ses catégories ;
•	ses statuts ;
•	ses unités ;
•	ses seuils ;
•	ses signatures ;
•	ses modèles de documents.
________________________________________
38. Administration des secteurs et modèles
38.1 Catalogue des secteurs
L’administrateur général doit pouvoir :
•	créer un secteur ;
•	modifier sa description ;
•	ajouter des sous-secteurs ;
•	associer des processus ;
•	associer des modèles ;
•	publier ;
•	archiver.
________________________________________
38.2 Modèles sectoriels
Pour chaque secteur, l’administrateur doit pouvoir préparer :
•	questionnaires ;
•	tables proposées ;
•	champs ;
•	relations ;
•	rapports ;
•	indicateurs ;
•	documents ;
•	recommandations.
________________________________________
38.3 Mise à jour des modèles
Lorsqu’un modèle général évolue, les entreprises utilisant une ancienne version doivent être informées.
Elles doivent pouvoir :
•	consulter les changements ;
•	accepter la mise à jour ;
•	reporter ;
•	conserver leur version ;
•	demander assistance.
________________________________________
39. Recherche d’aide et assistance utilisateur
39.1 Centre d’aide
L’application doit proposer :
•	guides ;
•	explications ;
•	tutoriels ;
•	réponses aux questions fréquentes ;
•	exemples ;
•	définitions des termes.
________________________________________
39.2 Aide contextuelle
Chaque écran complexe doit pouvoir afficher :
•	une explication ;
•	un exemple ;
•	les champs obligatoires ;
•	les erreurs fréquentes ;
•	le responsable à contacter.
________________________________________
39.3 Demande d’assistance
L’utilisateur doit pouvoir :
•	décrire un problème ;
•	joindre une capture ;
•	préciser l’urgence ;
•	suivre la demande ;
•	recevoir une réponse.
________________________________________
40. Alertes et suivi des anomalies
40.1 Types d’alertes
•	données manquantes ;
•	doublons ;
•	dépenses inhabituelles ;
•	ventes anormalement faibles ;
•	objectif non atteint ;
•	retard ;
•	document expiré ;
•	stock critique ;
•	utilisateur inactif ;
•	validation en attente ;
•	différence d’inventaire ;
•	import incomplet.
________________________________________
40.2 Traitement d’une alerte
Une alerte doit pouvoir être :
•	ouverte ;
•	affectée ;
•	commentée ;
•	traitée ;
•	reportée ;
•	clôturée ;
•	réouverte.
________________________________________
41. Fonctions sectorielles proposées
Cette section doit être validée secteur par secteur. Elle ne signifie pas que toutes les fonctions seront développées dans la première version.
41.1 Pharmacie
Fonctions proposées :
•	médicaments et produits ;
•	lots ;
•	dates d’expiration ;
•	fournisseurs ;
•	ventes ;
•	achats ;
•	stocks ;
•	alertes d’expiration ;
•	inventaires.
41.2 Clinique ou cabinet
Fonctions proposées :
•	patients ;
•	rendez-vous ;
•	prestations ;
•	praticiens ;
•	dossiers ;
•	paiements ;
•	documents ;
•	statistiques d’activité.
Le niveau de gestion médicale et la nature des données de santé doivent être définis séparément.
41.3 Garage et mécanique
Fonctions proposées :
•	clients ;
•	véhicules ;
•	interventions ;
•	pièces ;
•	techniciens ;
•	devis ;
•	dépenses ;
•	historique du véhicule.
41.4 Menuiserie, couture, imprimerie et ateliers
Fonctions proposées :
•	commandes ;
•	modèles ;
•	matières ;
•	production ;
•	délais ;
•	responsables ;
•	coûts ;
•	livraisons.
41.5 Centre de formation et établissement scolaire
Fonctions proposées :
•	apprenants ;
•	formations ;
•	classes ;
•	enseignants ;
•	inscriptions ;
•	présences ;
•	évaluations ;
•	paiements ;
•	attestations.
41.6 BTP
Fonctions proposées :
•	chantiers ;
•	clients ;
•	équipes ;
•	matériaux ;
•	dépenses ;
•	avancement ;
•	fournisseurs ;
•	engins ;
•	rapports de chantier.
41.7 Restauration, café et bar
Fonctions proposées :
•	produits ;
•	recettes ;
•	stocks ;
•	ventes ;
•	tables ou commandes ;
•	dépenses ;
•	personnel ;
•	inventaires.
41.8 Agriculture et élevage
Fonctions proposées :
•	parcelles ou unités ;
•	cultures ou animaux ;
•	intrants ;
•	alimentation ;
•	soins ;
•	production ;
•	ventes ;
•	pertes ;
•	dépenses.
41.9 Hôtellerie et hébergement
Fonctions proposées :
•	chambres ;
•	réservations ;
•	clients ;
•	séjours ;
•	prestations ;
•	dépenses ;
•	paiements ;
•	occupation.
41.10 Transport, transit et voyage
Fonctions proposées :
•	clients ;
•	trajets ;
•	véhicules ;
•	conducteurs ;
•	dossiers ;
•	expéditions ;
•	dépenses ;
•	livraisons ;
•	incidents.
41.11 Associations et centres culturels
Fonctions proposées :
•	membres ;
•	activités ;
•	projets ;
•	bénéficiaires ;
•	cotisations ;
•	dépenses ;
•	partenaires ;
•	rapports.
________________________________________
42. Fonctions non obligatoires à confirmer
Les fonctions suivantes sont proposées mais doivent être confirmées séparément :
•	facturation complète ;
•	comptabilité générale ;
•	calcul légal de la paie ;
•	paiement en ligne ;
•	messagerie instantanée ;
•	signature électronique ;
•	application mobile indépendante ;
•	mode hors connexion complet ;
•	synchronisation cloud-local ;
•	connexion à WhatsApp ;
•	connexion bancaire ;
•	intelligence artificielle ;
•	prévisions automatiques ;
•	reconnaissance de documents ;
•	lecture automatique de factures ;
•	portail client ;
•	portail fournisseur ;
•	portail salarié ;
•	gestion biométrique ;
•	géolocalisation ;
•	gestion fiscale par pays.
________________________________________
43. Expérience utilisateur attendue
43.1 Simplicité
L’utilisateur ne doit pas avoir besoin de connaissances en base de données pour utiliser APGEPCI.
L’application doit employer des termes métier compréhensibles.
________________________________________
43.2 Progressivité
Les écrans doivent afficher uniquement les fonctions nécessaires au profil et au contexte.
________________________________________
43.3 Cohérence
Les mêmes actions doivent avoir le même fonctionnement dans les différents modules.
________________________________________
43.4 Prévention des erreurs
Avant toute action importante, l’application doit :
•	expliquer les conséquences ;
•	demander confirmation ;
•	proposer une prévisualisation ;
•	permettre l’annulation lorsque possible.
________________________________________
43.5 Accessibilité fonctionnelle
Les textes doivent être lisibles.
Les formulaires doivent indiquer clairement :
•	les champs obligatoires ;
•	les erreurs ;
•	les actions ;
•	les statuts ;
•	les informations manquantes.
________________________________________
44. Sauvegarde, continuité et récupération
Sans entrer dans les choix techniques, le service doit garantir fonctionnellement :
•	la sauvegarde régulière des données ;
•	la récupération après incident ;
•	la restauration des données selon les droits ;
•	la conservation des versions importantes ;
•	la protection contre les pertes accidentelles ;
•	la possibilité d’exporter les données de l’entreprise.
Le propriétaire doit préciser :
•	la fréquence attendue ;
•	la durée de conservation ;
•	les responsabilités ;
•	les conditions de restauration.
________________________________________
45. Propriété et portabilité des données
Chaque entreprise doit rester propriétaire de ses données.
Elle doit pouvoir demander :
•	l’export de ses données ;
•	la fermeture de son espace ;
•	l’archivage ;
•	la restitution de ses documents ;
•	la suppression selon les règles applicables ;
•	un rapport des utilisateurs ayant eu accès.
Les conditions exactes doivent être définies dans les règles d’utilisation du service.
________________________________________
46. Scénarios fonctionnels de référence
46.1 Création d’une entreprise commerciale
1.	Le dirigeant crée son espace.
2.	Il renseigne son secteur.
3.	Il décrit ses produits et services.
4.	Il crée son organigramme.
5.	Il sélectionne ventes, achats, stock et RH.
6.	APGEPCI propose trois modèles.
7.	Il choisit un modèle opérationnel.
8.	Il valide les tables et champs.
9.	Il importe les clients et articles.
10.	Il crée les commerciaux.
11.	Il enregistre les objectifs.
12.	Les équipes saisissent les ventes.
13.	Le dirigeant consulte les réalisations et écarts.
14.	Il exporte le rapport mensuel.
________________________________________
46.2 Diagnostic d’une entreprise industrielle
1.	L’entreprise décrit ses ateliers.
2.	Elle renseigne ses produits fabriqués.
3.	Elle décrit les matières premières.
4.	Elle cartographie achats, stock et production.
5.	APGEPCI propose les modèles.
6.	Le responsable adapte les champs.
7.	Les équipes saisissent les consommations.
8.	L’application compare prévu et réel.
9.	Les pertes et écarts sont analysés.
10.	Un rapport de production est généré.
________________________________________
46.3 Suivi commercial
1.	Le responsable crée les commerciaux.
2.	Il affecte les zones et clients.
3.	Il définit les objectifs mensuels.
4.	Les ventes sont saisies ou importées.
5.	L’application calcule les réalisations.
6.	Les écarts sont affichés.
7.	Les dépenses commerciales sont rattachées.
8.	Les commissions sont calculées selon les règles validées.
9.	Le classement est affiché.
10.	Le rapport est exporté.
________________________________________
46.4 Correction d’une erreur
1.	Un utilisateur détecte une erreur.
2.	Il demande une modification.
3.	Il indique le motif.
4.	Le responsable examine l’ancienne et la nouvelle valeur.
5.	Il valide ou rejette.
6.	L’historique conserve toutes les étapes.
7.	Les rapports sont actualisés.
________________________________________
47. Périmètre fonctionnel recommandé pour la première version
Pour limiter les risques, la première version devrait se concentrer sur un ensemble cohérent.
47.1 Fonctions obligatoires proposées
•	création d’entreprise ;
•	multi-entreprises ;
•	utilisateurs et rôles ;
•	diagnostic initial ;
•	organigramme ;
•	cartographie des processus ;
•	trois modèles proposés ;
•	tables et champs personnalisables ;
•	relations ;
•	formulaires ;
•	saisie et modification ;
•	import Excel et CSV ;
•	détection de doublons ;
•	clients ;
•	articles et services ;
•	commerciaux ;
•	ventes ;
•	dépenses ;
•	prévisions ;
•	réalisations ;
•	écarts ;
•	ressources humaines ;
•	achats ;
•	stocks ;
•	requêtes ;
•	états ;
•	tableaux de bord ;
•	exports PDF, Word et Excel ;
•	impression ;
•	journal d’audit.
________________________________________
47.2 Secteurs pilotes proposés
•	commerce général ;
•	pharmacie ;
•	quincaillerie ;
•	garage et pièces détachées ;
•	centre de formation.
________________________________________
47.3 Fonctions pouvant être reportées
•	production avancée ;
•	SCM avancée ;
•	synchronisation cloud-local ;
•	intelligence artificielle ;
•	portail client ;
•	portail fournisseur ;
•	paie complète ;
•	comptabilité complète ;
•	application mobile indépendante ;
•	intégrations externes.
________________________________________
48. Critères fonctionnels de réussite
APGEPCI sera considérée fonctionnellement satisfaisante si une entreprise pilote peut :
1.	créer son espace ;
2.	décrire son organisation ;
3.	construire son organigramme ;
4.	sélectionner ses processus ;
5.	recevoir trois propositions ;
6.	choisir un modèle ;
7.	personnaliser les informations ;
8.	saisir ou importer ses données ;
9.	relier ses clients, produits, ventes et commerciaux ;
10.	corriger les erreurs ;
11.	contrôler les accès ;
12.	produire au moins cinq types de requêtes ;
13.	afficher prévisions, réalisations et écarts ;
14.	générer des états ;
15.	exporter en PDF, Word et Excel ;
16.	imprimer ;
17.	consulter l’historique ;
18.	empêcher une entreprise d’accéder aux données d’une autre.
________________________________________
49. Grille de validation du propriétaire
Le propriétaire doit répondre à chaque point.
49.1 Vision
•	☐ La vision générale correspond à mon idée.
•	☐ APGEPCI doit être une plateforme multi-entreprises.
•	☐ APGEPCI doit être multi-secteurs.
•	☐ L’application doit proposer trois modèles par processus.
•	☐ L’application doit permettre une personnalisation contrôlée.
49.2 Organisation
•	☐ Le diagnostic organisationnel est obligatoire.
•	☐ L’organigramme est obligatoire.
•	☐ La cartographie des processus est obligatoire.
•	☐ Chaque service doit avoir un responsable.
•	☐ Les validations doivent suivre l’organigramme.
49.3 Données
•	☐ L’application doit proposer cinq à sept tables par besoin.
•	☐ Les utilisateurs doivent pouvoir ajouter des champs.
•	☐ Les relations entre les tables doivent être configurables.
•	☐ La détection des doublons est obligatoire.
•	☐ Le dictionnaire des données est obligatoire.
49.4 Modules
•	☐ Ventes.
•	☐ Dépenses.
•	☐ Prévisions et écarts.
•	☐ Ressources humaines.
•	☐ Achats.
•	☐ Stock.
•	☐ Production.
•	☐ CRM.
•	☐ SCM.
•	☐ Projets et marchés.
•	☐ Documents.
49.5 Rapports
•	☐ Requêtes personnalisées.
•	☐ États personnalisés.
•	☐ Tableaux de bord.
•	☐ Export PDF.
•	☐ Export Word.
•	☐ Export Excel.
•	☐ Impression.
•	☐ Envoi automatique de rapports.
49.6 Accès
•	☐ Rôles standards.
•	☐ Rôles personnalisés.
•	☐ Accès par service.
•	☐ Accès par site.
•	☐ Accès par projet.
•	☐ Données sensibles.
•	☐ Journal d’audit.
49.7 Déploiement fonctionnel
•	☐ Version cloud.
•	☐ Version serveur privé.
•	☐ Version locale.
•	☐ Fonctionnement multi-site.
•	☐ Mode hybride.
•	☐ Utilisation sur téléphone.
•	☐ Utilisation sur tablette.
________________________________________
50. Questions obligatoires à trancher avant développement
50.1 Signification du nom
•	Quelle est la signification complète de l’acronyme APGEPCI ?
•	Une description officielle du nom doit-elle apparaître dans l’application ?
50.2 Utilisateurs cibles
•	L’application est-elle destinée uniquement aux entreprises privées ?
•	Les associations et structures publiques sont-elles incluses ?
•	Les particuliers ou travailleurs indépendants peuvent-ils créer un espace ?
50.3 Niveau de personnalisation
•	Les entreprises peuvent-elles créer librement leurs propres tables ?
•	La création doit-elle être validée par APGEPCI ?
•	Certains champs doivent-ils rester obligatoires ?
50.4 Modèles
•	Qui crée les trois modèles proposés ?
•	Le propriétaire d’APGEPCI ?
•	Un consultant ?
•	L’entreprise cliente ?
•	Les modèles doivent-ils être payants selon leur niveau ?
50.5 Validations
•	Quelles opérations doivent obligatoirement être validées ?
•	Combien de niveaux de validation sont nécessaires ?
•	Une validation électronique a-t-elle une valeur interne officielle ?
50.6 Rapports
•	Quels sont les dix rapports obligatoires pour la première version ?
•	Les rapports doivent-ils être envoyés automatiquement ?
•	Les utilisateurs peuvent-ils créer librement leurs propres rapports ?
50.7 Ressources humaines
•	Faut-il seulement suivre les salariés ?
•	Faut-il calculer les salaires ?
•	Faut-il gérer les congés, présences et contrats ?
•	Faut-il générer des bulletins ?
50.8 Finance
•	APGEPCI doit-elle suivre uniquement les dépenses et recettes opérationnelles ?
•	Doit-elle inclure la comptabilité générale ?
•	Doit-elle gérer les taxes ?
•	Doit-elle générer des états comptables officiels ?
50.9 Secteurs
•	Quels sont les cinq secteurs prioritaires ?
•	Quels secteurs sont exclus de la première version ?
•	Un modèle spécifique doit-il être validé avec un professionnel de chaque secteur ?
50.10 Cloud et local
•	Toutes les offres doivent-elles exister dès le lancement ?
•	Le mode local est-il obligatoire au lancement ?
•	Le mode hybride est-il une priorité ?
50.11 Commercialisation
•	L’application sera-t-elle vendue par abonnement ?
•	Par licence ?
•	Par installation ?
•	Par nombre d’utilisateurs ?
•	Par module ?
•	Par entreprise ?
•	Par volume de données ?
________________________________________
51. Décisions recommandées avant lancement du développement
Le propriétaire devrait valider un document final contenant :
1.	la signification officielle d’APGEPCI ;
2.	les cinq secteurs pilotes ;
3.	les modules obligatoires ;
4.	les dix rapports obligatoires ;
5.	les profils utilisateurs ;
6.	les règles de validation ;
7.	les informations obligatoires ;
8.	les fonctions reportées ;
9.	les modalités cloud ou locales ;
10.	les critères de réussite.
________________________________________
52. Conclusion
APGEPCI doit devenir une plateforme capable de comprendre le fonctionnement d’une entreprise, de structurer ses informations, de proposer des modèles adaptés, de centraliser ses données et de produire des analyses exploitables.
Sa valeur principale repose sur les capacités suivantes :
•	s’adapter aux secteurs ;
•	comprendre l’organisation ;
•	structurer les processus ;
•	proposer plusieurs modèles ;
•	éviter les redondances ;
•	relier les informations ;
•	contrôler les accès ;
•	tracer les modifications ;
•	comparer les prévisions aux réalisations ;
•	produire des états et rapports ;
•	exporter et imprimer les résultats.
La validation du propriétaire ne doit pas porter uniquement sur l’idée générale. Elle doit porter précisément sur :
•	les modules ;
•	les données ;
•	les rôles ;
•	les processus ;
•	les règles ;
•	les rapports ;
•	les secteurs ;
•	les priorités.
________________________________________
53. Zone de décision finale du propriétaire
Nom du propriétaire ou représentant : ……………………………………………………..
Fonction : ……………………………………………………………………………………….
Date de validation : …………………………………………………………………………..
Décision
•	☐ Le document correspond entièrement au besoin.
•	☐ Le document correspond partiellement au besoin.
•	☐ Des modifications sont obligatoires avant validation.
•	☐ Le projet doit être redéfini.
Commentaires généraux
…………………………………………………………………………………………………………….
…………………………………………………………………………………………………………….
…………………………………………………………………………………………………………….
Modules à retirer
…………………………………………………………………………………………………………….
Modules à ajouter
…………………………………………………………………………………………………………….
Secteurs prioritaires
…………………………………………………………………………………………………………….
Fonctions obligatoires pour la première version
…………………………………………………………………………………………………………….
Signature
…………………………………………………………………………………………………………….

