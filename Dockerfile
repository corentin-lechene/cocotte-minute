# Étape 1 : build de l'application
FROM --platform=linux/arm/v7 node:18-alpine AS builder

# Création du dossier de travail
WORKDIR /usr/src/app

# Installation des dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copier le reste du code
COPY . .

# Compiler TypeScript
RUN npm run build

# Étape 2 : image finale légère
FROM --platform=linux/arm/v7 node:18-alpine

WORKDIR /usr/src/app

# Copier uniquement les fichiers buildés et package.json
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Installer uniquement les dépendances prod
RUN npm ci --only=production

# Définir les variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Exposer le port utilisé par NestJS
EXPOSE 3000

# Commande pour lancer l'app
CMD ["node", "dist/main.js"]