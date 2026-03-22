TP – Intégration Firebase Authentication
Partie 1 — Préparation du service d’authentification
Pourquoi l’application n’a-t-elle pas besoin de stocker directement les mots de passe ?

L’application ne stocke pas les mots de passe car cette tâche est gérée par Firebase Authentication. C’est Firebase qui s’occupe de sécuriser, vérifier et stocker les identifiants. L’application envoie simplement les informations au service et récupère le résultat.

Partie 2 — Connexion avec des comptes créés dans Firebase
L’utilisateur existe-t-il dans l’application ou chez le fournisseur ?

L’utilisateur existe chez le fournisseur, donc chez Firebase. L’application ne garde pas de base d’utilisateurs locale.

Que contrôle encore l’application cliente ?

L’application gère l’interface (formulaires, messages), les vérifications simples (email valide, champs remplis), les redirections et l’affichage des informations de l’utilisateur connecté.

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
