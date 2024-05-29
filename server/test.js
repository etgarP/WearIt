const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

const token = jwt.sign({ username: "hello" }, secretToken);
console.log(token)
const decoded = jwt.verify(token, "not the secret token");
console.log(decoded)