var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://elxinpkp:0KjQYaempyKpOdnXwFr7LCtkBPJzlTyT@elmer-01.db.elephantsql.com:5432/elxinpkp';
var db = pgp(connectionString);

function getAllREstaurants()
{
	db.any('select * from restaurant')
	.then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			data: data,
			message:  'Recuperados todos los darestaurantes'
		});		
	})
	.catch(function(err){
			return next(err);
	});
}

function getRestaurantByName(req, res, next)
{
	var name = req.params.name;
	db.any('select * from restaurant where name = $1', name)
	.then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			data: data,
			message:  'Recuperados todos los restaurantes por nombre'
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function CreateRestaurant(req, res, next)
{
	db.none('insert into restaurant (name, city, address, phone) values($1, $2, $3, $4)', [req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
	.then(function(){
		res.status(200)
		.json({
			status: 'Exitoso',
			message:  'Creado un restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function removeRestaurant(req, res, next)
{
	var restaurantID = parseInt(req.params.id);
	db.result('delete from restaurant where id = $1', restaurantID)
	.then(function(){
		res.status(200)
		.json({
			status: 'Exitoso',
			message:  'eliminado un restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function updateRestaurant(req, res, next)
{
	var restaurantID = parseInt(req.params.id);
	db.result('update restaurant set name = $1, city = $2, address = $3, phone = $3 where id = $5', 
			 [req.body.name, req.body.city, req.body.address, parseInt(req.body.phone), restaurantID])
	.then(function(){	
		res.status(200)
		.json({
			status: 'Exitoso',
			message:  'actualizando un restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
}

module.exports =
{
	getAllREstaurants : getAllREstaurants,
	getRestaurantByName : getRestaurantByName,
	CreateRestaurant : CreateRestaurant,
	removeRestaurant : removeRestaurant,
	updateRestaurant : updateRestaurant
}