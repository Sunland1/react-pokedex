#Create container for the application
FROM node:19-alpine

#Create a directory
WORKDIR /usr/src/app

#Copy package.json and package-lock.json
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy all files
COPY . .

#Expose port 3000
EXPOSE 3000

#Run the app
CMD ["npm", "start"]
