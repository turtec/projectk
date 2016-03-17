/**
 * LogService
 **/
K.LogService = function (logEntry){

    if(K.DebugSettings.debug === true){

        var adddataString = '';

        if(K.DebugSettings.logsink==='console'){

            console.log(logEntry.message);

            if(logEntry.data){

                console.log(logEntry.data);

            }

        }
        else{
            if(logEntry.data){

                adddataString =  JSON.stringify(logEntry.data);

                message = logEntry.message + ' data  ' + adddataString ;

            }

            var data = {
                'message':message,
                'useragent':'unknown'
            };

        }

    }

};