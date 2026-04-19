# Stage 1: Build the Vite PWA
FROM node:18-alpine as builder
WORKDIR /app

# Copy Configuration Space
COPY package*.json ./

# Install Dependencies securely without hard lock bindings
RUN npm install

# Copy Application Footprint
COPY . .

# Build Vite Application
RUN npm run build

# Stage 2: Serve statically with lightweight Nginx
FROM nginx:alpine

# Establish isolated configuration mapping to Cloud Run defaults
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Map output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose explicit Cloud Run interface
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
