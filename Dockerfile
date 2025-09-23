# Étape 1 : Build
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet et build
COPY . .
RUN npm run build

# Étape 2 : Exécution
FROM node:20-alpine AS runner

WORKDIR /app

# Copier uniquement le nécessaire
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Variables
ENV NODE_ENV=production
ENV PORT=3000

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["node", "dist/main.js"]