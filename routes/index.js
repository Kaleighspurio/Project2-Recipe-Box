const router = require('express').Router();
const mainRoutes = require('./main-routes');
const htmlRoutes = require('./html-routes');
const favoritesRoutes = require('./favorite-routes');
const viewRoutes = require('./view-routes');
const createRoutes = require('./create-routes');

router.use('/api', mainRoutes);
router.use('/api/favorites', favoritesRoutes);
router.use('/api/view', viewRoutes);
router.use('/api/create', createRoutes);

router.use('/', htmlRoutes);

module.exports = router;
