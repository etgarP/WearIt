const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const http = require('http')
const cors = require('cors');
const customEnv = require('custom-env');
const mongoose = require('mongoose')

const server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

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
const ClientAuthRoutes = require('./routes/client/ClientAuth.js');
const ClientOrderRoutes = require('./routes/client/ClientOrder.js');
const ClientMatchesRoute = require('./routes/client/ClientMatches.js');

// Designer Routes
const DesignerAuthRoutes = require('./routes/designer/DesignerAuth.js');
const DesignerOrderRoutes = require('./routes/designer/DesignerOrder.js');
const DesignerProfileRoutes = require('./routes/designer/DesignerProfile.js');
const DesignerInfoRoutes = require('./routes/designer/DesignerInfo.js');

app.use('/api/client/auth', ClientAuthRoutes);
app.use('/api/client/orders', ClientOrderRoutes);
app.use('/api/client/matches', ClientMatchesRoute)

app.use('/api/designer/auth', DesignerAuthRoutes);
app.use('/api/designer/orders', DesignerOrderRoutes);
app.use('/api/designer/profile', DesignerProfileRoutes);
app.use('/api/designer/info', DesignerInfoRoutes);

server.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
})

// const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account credentials

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const messaging = admin.messaging();
// const getMessaging = require('./services/Firebase').getMessaging
// // sends the messaging to firebaseService
// getMessaging(messaging)
