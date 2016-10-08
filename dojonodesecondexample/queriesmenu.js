var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://elxinpkp:0KjQYaempyKpOdnXwFr7LCtkBPJzlTyT@elmer-01.db.elephantsql.com:5432/elxinpkp';
var db = pgp(connectionString);

function getAllMenu(req, res, next){
	db.any('select * from menu')
	.then(function(data){
			res.status(200)
			.json({
				status: 'Exitoso',
				data: data,
				message: 'Recuperados todos los restuarantes'
			});
	})
	.catch(function(err){
		return next(err);
	});
}

function getMenuByRestaurant(req,res,next){
	//var restaurant = req.params.id;
	/*
	res.status(200)
	.json({
		status:'Exitoso',
		data:req.params.id,
		message: 'Recuperados restaurantes por nombre'
	});
	*/

	db.any('select * from menu  where restaurant=$1',req.params.id)
	.then(function(data){
			res.status(200)
			.json({
				status:'Exitoso',
				data:data,
				message: 'Recuperados restaurantes por nombre'
			});
	})
	.catch(function(err){
		return next(err);
	});

}


function createMenu(req,res,next){
	db.none('insert into menu(name,description,price,restaurant) values ($1,$2,$3,$4)',
		[req.body.name, req.body.description, parseInt(req.body.price), parseInt(req.body.restaurant)]
	)
	.then(function(data){
			res.status(200)
			.json({
				status:'Exitoso',
				message: 'Insertado exitoso'
			});
	})
	.catch(function(err){
		return next(err);
	});
}

module.exports={
	getAllMenu:getAllMenu,
	getMenuByRestaurant:getMenuByRestaurant,
	createMenu:createMenu
}