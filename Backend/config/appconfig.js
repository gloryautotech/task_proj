let appConfig = {};
require('dotenv').config();

appConfig.port = process.env.PORT;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri:'mongodb+srv://admin:admin@cluster0.kxctn.mongodb.net/task?retryWrites=true&w=majority'
}
appConfig.apiVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}