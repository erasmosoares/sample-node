# Very small linux distribution
FROM node:18.14.2-alpine3.17

# Setting up the user (for security - non root)
# RUN addgroup app && adduser -S -G app app
# USER app

# App workspace
WORKDIR /app

# Copy everything to the destination
COPY . .

# Run npm
RUN npm install

# Set environments variables
ENV _jwtPrivateKey=1234567890
ENV _connectionString="mongodb+srv://erasmosoares:eden7336@cluster0.l0jos.mongodb.net/playground?retryWrites=true&w=majority"
ENV _connectionStringLog="mongodb+srv://erasmosoares:eden7336@cluster0.l0jos.mongodb.net/playground-logs"

# Expose ports 
EXPOSE 3000

# Init the node project
CMD ["node","index.js"]


