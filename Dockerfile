FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Generate prisma client
RUN npx prisma generate

# Expose port 3000
EXPOSE 4000

# Run the app 
CMD [ "npm", "start" ]
