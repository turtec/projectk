K.Widget = function(){

};

K.Widget.prototype =
{
    init : function(viewPort, templateId){

        this.viewPort = viewPort;

        this.templateId = templateId;

    },
    render : function(){

        K.TemplateRenderer(this.viewPort, this.templateId);

        /*var elem = document.createElement('a');
         elem.setAttribute('href','#');
         elem.innerHTML='einlink';

         // published events
         elem.addEventListener('click', function(){
         eventHub.fire('widget1.click');
         });

         var viewPort = document.getElementById(this.viewPort);

         viewPort.appendChild(elem);*/

    }

};

K.Widget.extend = function(props, static){

    var parent = K.Widget;

    var child;

    child = function(){

    };

    child.prototype = parent.prototype;

    child.prototype.constructor = child;

    return child;

};