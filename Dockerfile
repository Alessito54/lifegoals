# Etapa 1: Construir la aplicación
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:20-alpine

WORKDIR /app

# Instalar servidor estático
RUN npm install -g serve

# Copiar los archivos construidos de la etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Comando para servir la aplicación con fallback a index.html (para Angular SPA)
CMD ["serve", "-s", "dist/metasEnLaVida/browser", "-l", "3000"]
