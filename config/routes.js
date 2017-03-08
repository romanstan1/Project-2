const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const oauth = require('../controllers/oauth');
const oauthConfig = require('../config/oauth');
const images = require('../controllers/images');

const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index', { oauth: oauthConfig }));

router.route('/register')
  .post(registrations.create);

router.route('/images')
  .get(images.index)
  .post(secureRoute, upload.single('filename'), images.create);

router.route('/images/new')
  .get(secureRoute, images.new);

router.route('/images/:id')
  .get(images.show)
  .delete(secureRoute, images.delete);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);


router.route('/oauth/facebook')
  .get(oauth.facebook);

router.route('/users/edit')
  .get(secureRoute, sessions.edit);

router.route('/users/:id')
  .get(secureRoute, sessions.show)
  .put(secureRoute, sessions.update);


//
router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router; //export the function Router()
