/**
 * Wrapps the HandleBar Templateingengine-Calls
 * @constructor
 */
K.TemplateRenderer = function (placeholderId, templateId, templateData, callback) {

    var source = document.getElementById(templateId).innerHTML;

    var template = Handlebars.compile(source);

    if (templateData !== undefined) {

        document.getElementById(placeholderId).innerHTML = template(templateData);

    }
    else {

        document.getElementById(placeholderId).innerHTML = template();

    }

    if(callback){
        callback();
    }

};