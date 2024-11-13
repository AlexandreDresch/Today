# Use an official node image
FROM node:22.8.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the Vite default port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]