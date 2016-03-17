var K = {};

K.DebugSettings = {
	debug: true,
	logsink: 'console'
};

/**
* inherits 
* prototype chain
**/
K.inhertit = function(parent, child){

	// create a proxy constructor
	var proxy = function(){}

	// copy the parent prototype to the proxy
	proxy.prototype = parent.prototype;

	// all parent prototype member will be added
	// to the child prototype all static members
	// with the same name will stay
	child.prototype = new proxy();

	// set the old constructor
	child.prototype.constructor = child;

};
