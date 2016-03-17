var Router = function(){

};

Router.prototype = {

	 routes: [],
	 addRoute: 


};


	var routes = [];
	
    var addRoute = function(url, controller, method){
    	
    	routes.push(new Route(url,controller, method));
	
	};

	var flush = function(){

		routes = [];

	};

	var routeTo = function(){
		//Current route url (getting rid of '#' in hash as well):
		var url = location.hash.slice(1) || '/';

		if(findMatching(url)){
			alert('mact foun');
		}
		else{
			alert('url not found');
		}

	};

	var findMatching = function(match){

		var retVal = null;

		for(var i=0; i<routes.length; i++){
			
			if(match===routes[i].url){
				retVal = routes[i];
				break;
			}
		}

		return retVal;
	};

    var Route = function(url,controller,method){

    	this.url = url;
    	this.controller = controller;
    	this.method = method;

    };

    return {

    	addRoute: addRoute,
    	routeTo: routeTo
    }

}();