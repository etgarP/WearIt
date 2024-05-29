const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const http = require('http')
const cors = require('cors');
const customEnv = require('custom-env');
const mongoose = require('mongoose')

const server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.static('public'))

// Client Routes
const ClientAuthRoutes = require('./routes/ClientAuth.js');
const ClientOrderRoutes = require('./routes/Order.js');
// const ClientDesignRoutes = require('./routes/ClientDesign');
// const ClientGroupRoutes = require('./routes/ClientGroup');

// Designer Routes
const DesignerAuthRoutes = require('./routes/DesignerAuth');
// const DesignerOrderRoutes = require('./routes/DesignerOrder');
// const DesignerProfileRoutes = require('./routes/DesignerProfile');

app.use('/api/client/auth', ClientAuthRoutes);
app.use('/api/client/orders', ClientOrderRoutes);
// app.use('/api/client/designs', ClientDesignRoutes);
// app.use('/api/client/groups', ClientGroupRoutes);

app.use('/api/designer/auth', DesignerAuthRoutes);
// app.use('/api/designer/orders', DesignerOrderRoutes);
// app.use('/api/designer/profile', DesignerProfileRoutes);

server.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
})

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();
// const getMessaging = require('./services/Firebase').getMessaging
// // sends the messaging to firebaseService
// getMessaging(messaging)
