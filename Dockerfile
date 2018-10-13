FROM node:carbon as buildimage

# Copy assets and install dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --silent
COPY . ./

# Build
RUN CI=true npm run build

FROM nginx
COPY --from=buildimage /usr/src/app/dist /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
