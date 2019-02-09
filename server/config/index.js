const path = require('path');
// config.js
module.exports = {
  routePath: `${path.join(__dirname,'../','routes')}`,
  controllerPath: '../controllers/',
  timezone: 'Asia/Kolkata',
  secret : 'AlgoScaletask',
  databaseUri: 'mongodb://localhost:27017',
  databaseOptions: {
    dbName: 'NotesManagement',
    authSource: 'NotesManagement',
    autoReconnect: true,
    keepAlive: 1,
    useNewUrlParser: true 
  },
  twitter_api:{
    consumer_key        : 'KsZC84gX7DxO9XIDWat0MJ0ai',
    consumer_secret     : '6JXmH08B1IFEupN47we1JTUEyKWUU439A4OBE7POIrppolq6PA',
    access_token        : '702902633489571841-eUkkwX0cwvtConGyuUdrFKpbt98Ez0t',
    access_token_secret : 'i1T2eXI31P3NJZXQ0glqxVhoCMqHQJ7hjDNX0AA7PI53v'
  }
};
