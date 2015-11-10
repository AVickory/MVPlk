var bodyParser = require('body-parser');
pageController = require('./pageController.js')
module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  // var Router = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // console.log(__dirname + '/../client')
  app.use(express.static(__dirname + '/../client'));

  app.route('/text/*')
    .get(pageController.sendPage)
    //.post(pageController.addBranch);


  // app.use('/', Router); // use user router for all user request

};
