function route(handle, pathname, response)
{
	console.log('se invoca la funcion para' + pathname);
	if(typeof handle[pathname] === 'function')
	{
		return handle[pathname](response)
	}
	else
	{
		console.log('no se encontro el manipulador para' + pathname);
		response.writeHead(404, {'content-type' : 'text/html'});
		response.write('Direccion no disponible');
		response.end();
	}
}

exports.route = route;