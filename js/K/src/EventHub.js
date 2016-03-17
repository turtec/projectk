var K = K || {};

K.EventHub = function() {

    this.listeners = {};

    this.publishers = {};

};

K.EventHub.prototype = {

    constructor: K.EventHub,

    addEventListener: function (eventtype, fn, context, contextidentifier) {

        fn = typeof fn === "function" ? fn : context[fn];

        // check if the eventtype is already registered
        if (typeof this.listeners[eventtype] == "undefined") {
            this.listeners[eventtype] = [];
        }

        //@todo remove pending
        var listener = {
            fn: fn,
            context: context || this,
            listenon: eventtype,
            contextidentifier: contextidentifier,
            pending: true
        };

        this.listeners[eventtype].push(listener);

        // check if a contextname is given
        // contextname will be used for hashing
        // all listeners added to a context

        if (typeof contextidentifier != "undefined") {

            if (typeof this.publishers[contextidentifier] == "undefined") {

                this.publishers[contextidentifier] = [];

            }

            this.publishers[contextidentifier].push(listener);

        }

    },

    fire: function (eventType, data) {

        console.log('fire ' + eventType);

        if (typeof eventType == "string") {
            eventType = { type: eventType };
        }

        if (!eventType.type) {
            throw new Error("Event object missing 'type' property.");
        }

        if (this.listeners[eventType.type] instanceof Array) {

            var len = this.listeners[eventType.type].length;

            for (var i = 0; i < len; i++) {

                if (this.listeners[eventType.type][i] && this.listeners[eventType.type][i].pending) {

                    this.listeners[eventType.type][i].fn.call(this.listeners[eventType.type][i].context, data);

                }

            }

        }

    },
    removeAllListeners: function(type){

        if(this.listeners[type])
            this.listeners[type]=[];

    },
    removeAllListenersFromPublisher: function (contextidentifier) {


        // get all listners registered

        if (typeof this.publishers[contextidentifier] == "undefined") {

            return;
        }

        var tempPublishers = this.publishers[contextidentifier];

        var len = tempPublishers.length;

        for (var i = 0; i < len; i++) {

            var listenOn = tempPublishers[i].listenon;

            if (this.listeners[listenOn] instanceof Array) {

                var tempListeners = this.listeners[listenOn];

                var offset = 0;
                var jlen = tempListeners.length;
                var jo = 0;

                for (var j = 0; j < jlen; j++) {

                    jo = j;
                    if (tempListeners[jo].contextidentifier === contextidentifier) { // && tempListeners[i].context === context){

                        tempListeners[jo].pending = false;
                        // tempListeners.splice(jo, 1);
                        offset++;


                    }
                }

                this.listeners[listenOn] = tempListeners;

            }
        }
    },



    removeListener: function (type, fn, context) {

        fn = typeof fn === "function" ? fn : context[fn];

        if (this.listeners[type] instanceof Array) {

            var tempListeners = this.listeners[type];

            var len = tempListeners.length;

            for (var i = 0; i < len; i++) {

                if (tempListeners[i].fn === fn) { // && tempListeners[i].context === context){

                    tempListeners.splice(i, 1);
                    break;
                }
            }

            this.listeners[type] = tempListeners;

        }
    }

};