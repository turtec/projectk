/**
 * Router
 * methods for routing via url
 * handlers can be defined via string (controller.method)
 * or direct function
 **/
K.Router = function(namespace){

    var namespace = namespace || window;

    var routes = [];

    var routeTo = function(){

        //Current route url (getting rid of '#' in hash as well):
        var url = location.hash.slice(1) || '/';

        var match = _findMatching(url);

        if(match){

            if(typeof match.handler === 'function'){

                _callFunctionHandler(match.handler);

            }
            else if(typeof match.handler === 'string'){

                _callControllerHandler(match.handler);

            }

        }
        else{
            alert('url not found');
        }

    };

    var flush = function(){

        routes = [];

    };

    /**
     * used for progammatical navigation
     **/
    var navigateTo = function(path){

        path = path ? path : '';

        if(this.mode === 'history') {
            history.pushState(null, null, this.root + _clearSlashes(path));
        } else {
            var newLink = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            console.log(newLink);
            window.location.href = newLink;
        }

        return this;

    };

    var addRoute = function(routeParams){

        routes.push(routeParams);

        return this;
    };

    var _findMatching = function(match){

        K.LogService({'message':'Router.findMatching'})

        var retVal = null;

        for(var i=0; i<routes.length; i++){

            if(match===routes[i].url){
                retVal = routes[i];
                break;
            }
        }

        return retVal;
    };


    var _callFunctionHandler = function(handler){

        handler.apply({});

    };

    var _callControllerHandler = function(handler){

        var elements = handler.split(".");

        var controllerName = elements[0];

        var controllerMethodName = elements[1];

        var controller = namespace[controllerName];

        if(controller){
            controller[controllerMethodName]();
        }
        else{
            console.log('controller');
        }

    };

    var _clearSlashes = function(path) {

        return path.toString().replace(/\/$/, '').replace(/^\//, '');

    };

    /**
     * public API
     * addRoute: adds a route
     * routeTo: ????
     * navigateTo: ????
     **/
    return {

        addRoute: addRoute,
        routeTo: routeTo,
        navigateTo: navigateTo

    }

}();