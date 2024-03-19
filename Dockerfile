# Stage 1: Build the React app
FROM node:latest as build-stage
WORKDIR /app
#COPY pomodoro-react-app/package*.json ./
#RUN npm install
#COPY pomodoro-react-app/ .
#RUN npm run build

# Stage 2: Setup Nginx to serve both apps
FROM nginx:alpine
# Copy the build output from the first stage
#COPY --from=build-stage /app/build /usr/share/nginx/html/pomodoro
# Copy the static JS/HTML app files
COPY ./pomodoro-javascript-app /usr/share/nginx/html/static
# Replace default Nginx config with our custom config
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
