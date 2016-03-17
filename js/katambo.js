(function(){

	K = {};

	K.element = function(){


	};

	K.element.prototype.function1 = function(){

	};


	K.version = '0.0.1';

})();

Object.gen = function(o) {
   var makeArgs = arguments 
   function F() {
      var prop, i=1, arg, val
      for(prop in o) {
         if(!o.hasOwnProperty(prop)) continue
         val = o[prop]
         arg = makeArgs[i++]
         if(typeof arg === 'undefined') break
         this[prop] = arg
      }
   }
   F.prototype = o
   return new F()
}

K.WidgetView = function(){

};

K.WidgetView.prototype.init = function(){

};

K.WidgetView.prototype.setTemplate = function(name){

	this.template = name;

};

K.WidgetView.prototype.render = function(){

	console.log('render' + this.template);

};

K.WidgetView.prototype.teardown = function(){

	console.log('teardown');

};

var secondView = {
	 template: { value: 42 }, 
    myfunction:{value: function(){
      console.log('myfunction')
    }},
};

var myView2 = Object.create(K.WidgetView.prototype,secondView);
console.log(myView2);
myView2.setTemplate('new');
myView2.render();
myView2.myfunction();

/*
var myView2 = Object.create(K.WidgetView.prototype, secondView);
myView2.render();
myView2.setTemplate('def2');
myView2.render();
myView2.myfunction();
var secondView2 = {

};
var myView2 = Object.create(K.WidgetView.prototype, secondView2);
myView2.render();
myView2.setTemplate('def2');
myView2.render();*/
