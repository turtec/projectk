

Router.addRoute(
	{url:'abc',handler:function(){
		alert('function Handler to call');
	}}
	);
Router.addRoute(
	{url:'abcd',handler:'aController.goto'}
	);



var Controller = function(text,link){

	this.text = text;
	this.link = link;

	this.goto = function(){
		alert('goto called')
		document.getElementById('viewport').innerHTML = this.text;
		document.getElementById('link').setAttribute('href',this.link);
	}

};

var aController = new Controller('controller1','#abcd');
var aController2 = new Controller('controller2','#abc');

// Listen on hash change:
window.addEventListener('hashchange', Router.routeTo);



/* */

// Listen on page load:
window.addEventListener('load', function(){
	document.getElementById('backlink').addEventListener('click', function(){
		window.history.back();
	});
});