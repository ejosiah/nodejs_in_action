var net = require('net');
var EventEmitter = require('events').EventEmitter;

var channel = new EventEmitter();

channel.clients = {};
client.subscriptions = {};

channel.on('join', function(id, client){
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message){
		if(id != senderId){
			this.clients[id].write(message);
		}
	}
	this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function(client){
	var id = client.remoteAddress + ":" + client.remotePort;
	client.on('connect', function(){
		channel.emit('join', id, client);
	});
	client.on('data', function(data){
		channel.emit('broadcast', id, data);
	});
});
server.listen(8000);