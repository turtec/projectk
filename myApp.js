var myApp = function(){


	var eventHub = new K.EventHub();

	K.Router.addRoute(
		{url:'abc',handler:function(){
			myHeadlineWidget.change('neuerText');
			//alert('function Handler to call');
		}}
	)
	.addRoute(
		{url:'abcd',handler:function(){
			alert('function Handler to call dd');
		}}
	).
	addRoute(
		{url:'abcd',
			handler:'aController.goto'}
	);

	var viewPorts = [];

	window.addEventListener('hashchange', K.Router.routeTo);

	/**
	* listens on events
	**/
	var mediator = function(){

		eventHub.addEventListener('widget1.clicked', function(){
			
			K.Router.navigateTo('abc');
			
		});
	
	}();


	/*var linkWidget = K.Widget.extend({
		myVariable: 'myFunction',
		myFunction: function(){
			alert('my Function');
		}
	});
	
	aWidget = new linkWidget('abc');
	aWidget.init('viewport_one','example-template');	

	aWidget.render();*/

	//aWidget.myFunction();


	var headlineWidget = function(){


	}

	headlineWidget.prototype.render = function(){

		var root = this;

		K.TemplateRenderer('headline','headline-template');

	}

	headlineWidget.prototype.change = function(text){

		alert('change');

	}

	var myHeadlineWidget = new headlineWidget();

	myHeadlineWidget.change = function(text){

		document.getElementById('myHeadline').innerHTML = text;

	};

	myHeadlineWidget.render();


	var aWidget = function(){

	}

	aWidget.prototype.init = function(config){

		this.events = [];

		var aEvent = {
			'domId': 'id_link1',
			'event': 'click',
			'publish': function(e){eventHub.fire('widget1.clicked');e.preventDefault();}  
		}

		var aEvent2 = {
			'domId': 'id_link1',
			'event': 'mouseover',
			'publish': function(){eventHub.fire('link1 hover')}  
		}

		this.events.push(aEvent);
		//this.events.push(aEvent2);

	};

	aWidget.prototype._registerEvents = function(){

		var root = this;

		for(var i=0; i < root.events.length; i++){

			document.getElementById(root.events[i].domId).addEventListener(root.events[i].event,root.events[i].publish);
		
		}

	};

	aWidget.prototype.render = function(){

		var root = this;

		K.TemplateRenderer('viewport_one','example-template',null, function(){
			root._registerEvents();
		});

	}

	myWidget = new aWidget();
	myWidget.init();
	myWidget.render();


	var aWidget2 = function(){

	}

	aWidget2.prototype.init = function(config){

		this.events = [];

		var aEvent = {
			'domId': 'id_link2',
			'event': 'click',
			'publish': function(){eventHub.fire('widget2.clicked')}  
		}

		var aEvent2 = {
			'domId': 'id_link2',
			'event': 'mouseover',
			'publish': function(){eventHub.fire('link1 hover')}  
		}

		this.events.push(aEvent);
		//this.events.push(aEvent2);

	};

	aWidget2.prototype._registerEvents = function(){

		var root = this;

		for(var i=0; i < root.events.length; i++){

			document.getElementById(root.events[i].domId).addEventListener(root.events[i].event,root.events[i].publish);
		
		}

	};

	aWidget2.prototype.render = function(){

		var root = this;

		K.TemplateRenderer('viewport_two','example-template2',null, function(){
			root._registerEvents();
		});

	}

	myWidget = new aWidget2();
	myWidget.init();
	myWidget.render();

};