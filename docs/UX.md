

# UX IBO

## Reflexions en vrac

* Mobile VS desktop ?
    * 2/3 - 1/3 d'usage en faveur du mobile, mais les sessions sont plus longues sur desktop
    * Plus facile d'adapter à postériori une UX mobile au desktop que l'inverse
    * cf. oral VS écrit
* Trigger test anglais ludique VS s'amuser avec une AI:
    * Le test d'anglais parle à plus de monde et correspond à la cible de l'app
    * La barre pour que c'est un intérêt et que les gens partagent sur le test d'anglais est peut-être plus haute: il faut vraiment que ça marche bien
    * Si on le market comme un jeu avec l'AI, on peut le faire en français (cf. français VS Anglais)
    * On peut pas faire d'adwords pour l'IA
    * Les deux implique une résultat post-test different:
        * Comment l'AI s'est comporté dans l'axe AI
        * Comment le user s'est comporté par rapport aux autre dans l'axe test d'Anglais
* En Anglais VS en français
    * L'anglais permet de tapper tout le monde
    * Le français est moins intimidant pour les français (beaucoup de gens ne lisent jamais les sites en anglais)
* Oral VS écrit:
    * Web Speech API: Desktop (chrome) OK (Très bien), android (chrome) OK, iphone (safari) KO
    * Une démo orale est peut-être plus impressionnante mais exclue les personnes moins fortes
    * un input orale aura peut-être plus d'erreurs que un input écrit (pour entrainer le NN)
    * L'oral permet de se démarquer des tests d'anglais en ligne actuellement (tous écrits / écoute)
    * Sur mobile: pas évident de tapper par écrit:
        * Les français n'ont pas le clavier US sur leur mobile. Ce qui fait qu'il faut désactiver complétion / correcteur, ce qui rend le fait de tapper encore plus pénible

## Choix

* Site web Mobile First: pour capter le maximum de traffic
* Trigger AI: pour pouvoir le faire en anglais, sans feedback particulier et toucher les early adopters / curieux
* En Anglais: car on ne vise pas le test de langue
* A l'écrit: avec le clavier du tel (ils peuvent parler s'ils veulent). Le clavier ne pose pas de problème tant qu'on vise les anglo-saxons

=> Mobile / Test AI / Anglais / Ecrit

## Cible

* Vit aux USA, ou a l'habitude de consulter du contenu en Anglais
* Geek, curieux sur l'IA
* 25 - 45 ans

## Deductions de la cible

Conclusions:
* Il faut une vignette sympa quand le test est partagé
* Il ne faut pas "personaliser" l'AI (perte de crédibilité pour un geek)
* Le nom doit être évocateur pour cette population

## idées de nom


## Ecrans

### Ecran 1: Home

Titre: Guess it AI  !

USP: Can an AI guess what your are talking about ?

Image du jeu avec chat juste en dessous. TODO: avec petites images de l'entité devinnée

User: It's a robot
    AI: Wall-E ?
User: In Star Wars
    AI: R2D2 ?
User: The one who talks a lot
    AI:C3PO !

Bouton "Let's play"

### Ecran 2: Jeu

6 personnes à faire deviner (=3 minutes de jeu)

#### 2.1 Une popup

    Describe
      XXX
   PHOTO DE XXX (en V2)
in under 30 seconds

Bouton action première "Go !"
Bouton discret action secondaire (sans contrast) "Pass"

#### 2.2 Ecran de chat

Ecran de chat. On suit en gros whatsapp

* Barre de menu en haut:
    * Le nom de l'entité à faire deviner
    * compteur de temps
    * un bouton discret "Pass"

* Le chat
    * Le user: à droite en vert
    * L'AI: à gauche en jaune. Avec un petit icone pour donner un avatar à l'AI
    * Ligne de texte + à droite bouton "send" (idem bouton Enter)

* Fin d'une entité:
    * Si l'AI a trouvé: afficher en popup in smiley qui sourit une seconde avant le prochain guess
    * Sinon un passe directment au suivant

### Ecran 3: résultat

* Congrats ! XX characters found
* Select a character to see what the AI was thinking
* Liste des 6 petites photos des personnages
* Il click sur une photo:
    * Liste des personnages devinnés par l'AI avec une proba affichée sous forme de "barre" pourcentage

* Un bouton "Play again"