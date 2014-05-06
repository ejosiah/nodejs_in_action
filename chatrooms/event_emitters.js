var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
channel.on('join', function(){ console.log('Welcome!')});

setTimeout(function(){  channel.emit('join') }, 2000);
