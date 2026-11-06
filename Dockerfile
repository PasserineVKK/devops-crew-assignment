# Stage 1: Build React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application source code
COPY . .

# Vite build environment arguments with default fallbacks
ARG VITE_MOCK_API_URL=https://6ac9ddec3115bcc958202472.mockapi.io/orchid
ARG VITE_GOOGLE_CLIENT_ID=846374891143-r1qrnc22ktmhl450sjemfhds1dvm752j.apps.googleusercontent.com

ENV VITE_MOCK_API_URL=$VITE_MOCK_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

# Build static bundle for production
RUN npm run build

# Stage 2: Serve production bundle with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose container HTTP port
EXPOSE 80

# Start Nginx server in foreground
CMD ["nginx", "-g", "daemon off;"]

