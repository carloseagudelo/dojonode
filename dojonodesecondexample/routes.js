var express = require('express');
var router = express.Router();
var db = require('./queries');
var dbm = require('./queriesmenu');

router.get('/api/restaurants', db.getAllREstaurants);
router.get('/api/restaurants/:name', db.getRestaurantByName);
router.post('/api/restaurants/', db.CreateRestaurant);
router.delete('/api/restaurants/:id', db.removeRestaurant);
router.put('/api/restaurants/:id', db.updateRestaurant);

router.get('/api/menu', dbm.getAllMenu);
router.get('/api/menu/:id', dbm.getMenuByRestaurant);
router.post('/api/menu/', dbm.createMenu);
module.exports = router;
