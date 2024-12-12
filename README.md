# WearIT

Welcome to **WearIT**, a cutting-edge virtual clothes try-on solution. Below, you'll find instructions for installing and running both the client and server components of the application.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/), which comes with Node.js
- [Expo CLI](https://expo.dev/) (install globally with `npm install -g expo-cli`)
- [Nodemon](https://www.npmjs.com/package/nodemon) (optional, but recommended for server development)

## Installation and Setup
### Client
The client is built using React Native and leverages Expo for development.

1. Navigate to the `Client` directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Use the Expo Developer Tools to run the app on your physical device (via the Expo Go app) or an emulator.

### Server
The server is built with Node.js and handles the backend logic for the WearIT app.

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server using Nodemon (to auto-restart on file changes):
   ```bash
   nodemon app.js
   ```

   Alternatively, you can start the server without Nodemon:
   ```bash
   node app.js
   ```

4. The server will run on `http://localhost:12345/` by default (or the port specified in your app configuration).

## Development Tip
- To simulate a mobile experience, connect your physical device to the same network as your development machine.

- **Expo app not loading the project?**
  Make sure your phone and computer are on the same Wi-Fi network.
  
---
Thank you for using WearIT! We hope you enjoy your virtual try-on experience.

