TP – Intégrer un fournisseur d’authentification à une application web avec Firebase Authentication Contexte

Partie 1 — Préparation du service d’authentification
Pourquoi l’application n’a-t-elle pas besoin de stocker directement les mots de passe ?

L’application ne stocke pas les mots de passe car cette tâche est gérée par Firebase Authentication. C’est Firebase qui s’occupe de sécuriser, vérifier et stocker les identifiants. L’application envoie simplement les informations au service et récupère le résultat.

Partie 2 — Connexion avec des comptes créés dans Firebase
L’utilisateur existe-t-il dans l’application ou chez le fournisseur ?

L’utilisateur existe chez le fournisseur, donc chez Firebase. L’application ne garde pas de base d’utilisateurs locale.

Que contrôle encore l’application cliente ?

L’application gère les interfaces, les vérifications simples, les redirections et l’affichage des informations de l’utilisateur connecté.

Partie 3 — Création de compte depuis l’application
En quoi la création de compte depuis l’application change-t-elle le rôle de l’application ?

Avant, l’application utilisait des comptes déjà créés dans Firebase. Maintenant, elle permet aussi de créer des comptes directement. Elle devient donc une interface entre l’utilisateur et Firebase pour gérer les comptes.

Pourquoi faut-il valider les champs côté client même si Firebase vérifie déjà certaines contraintes ?

La validation côté client permet d’afficher des erreurs immédiatement et d’éviter d’envoyer des requêtes inutiles. Cela améliore l’expérience utilisateur.

Partie 4 — Politique de mot de passe
Une politique plus stricte améliore-t-elle toujours la sécurité réelle ?

Pas forcément. Si les règles sont trop strictes, les utilisateurs peuvent choisir des mots de passe simples ou les noter, ce qui peut réduire la sécurité.

Quel est le risque d’un mot de passe “conforme” mais réutilisé ailleurs ?

Si un mot de passe est utilisé sur plusieurs sites et qu’il est compromis sur l’un d’eux, il peut être utilisé pour accéder à d’autres comptes.

Partie 5 — Réinitialisation du mot de passe

L’application ne gère pas directement le mot de passe. Elle utilise Firebase pour envoyer un email de réinitialisation. Cela permet à l’utilisateur de changer son mot de passe de manière sécurisée sans que l’application n’y ait accès.

Partie 6 — Fournisseurs fédérés (Google)
Quelle différence entre un compte local Firebase email/mot de passe et une authentification fédérée ?

Avec email/mot de passe, le compte est créé spécialement pour l’application. Avec Google, l’utilisateur utilise un compte existant et l’application fait confiance à Google pour vérifier son identité.

L’application connaît-elle le mot de passe Google de l’utilisateur ?

Non, l’application ne voit jamais le mot de passe Google. Il est saisi directement sur le site de Google.


TD — Réflexion sur un passage de Authentication à ProSantéConnect
1. Dans l’application Firebase actuelle, quelles fonctionnalités dépendent d’un “compte local géré par le fournisseur” ?
création de compte
connexion email/mot de passe
mot de passe oublié
2. Si on remplace Firebase par Pro Santé Connect, quels écrans deviennent inadaptés ou doivent être repensés ?

Les écrans de création de compte, de connexion classique et de réinitialisation ne sont plus nécessaires avec Pro Santé Connect.

3. Qu’est-ce que l’application devrait faire à la place d’un formulaire de connexion local ?

Il faut ajouter un bouton qui redirige vers Pro Santé Connect pour se connecter.

4. Quelles nouvelles informations techniques faudrait-il configurer côté application ?
client ID
client secret
URL de redirection
paramètres OIDC
5. Qu’est-ce qui change dans la responsabilité de l’application ?

L’application ne gère plus directement la connexion. Elle doit gérer une redirection vers un service externe et traiter le retour.

6. Que peut-on conserver malgré tout de l’application Firebase actuelle ?
les pages de l’application
l’interface
l’affichage des données utilisateur
7. Pourquoi le passage à PSC est-il plus lourd qu’un simple changement de SDK ?

Parce que Pro Santé Connect utilise un système standard (OIDC) avec redirections, sécurité et configuration plus avancée, contrairement à Firebase qui est plus simple à utiliser côté client.
