# Very small linux distribution
FROM node:18.14.2-alpine3.17

# Setting up the user (for security - non root)
# RUN addgroup app && adduser -S -G app app
# USER app

# App workspace
WORKDIR /app

# Creating a directoy
RUN mkdir data

# Copy the files we need to nom install
COPY ["package.json", "package-lock.json*", "./"]

# Run npm
RUN npm install

# Copy all the application files
COPY . .

# Set environments variables
# ENV _jwtPrivateKey=<your private key>
# ENV _connectionString=<your mongodb application connection string>
# ENV _connectionStringTest=<your mongodb application connection string for integration tests>
# ENV _connectionStringLog=<your mongodb application logs connection string>


# Expose ports 
EXPOSE 3000

# Init the node project
CMD ["node","index.js"]


