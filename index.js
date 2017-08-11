/**
 * INDEX.JS
 * 
 * CORE SERVER FILE
 */


/**
 * Dependendies
 */
var express = require('express');
var bodyParser = require('body-parser');
var serverConf = require('./config/server/local.js');
var database = require('./config/db/mlab-config.js');


/**
 * Lib Declarations
 */
var server = express();

/**
 * MIDDLEWARE
 */
server.use(express.static(__dirname + "/www"));
server.use(bodyParser.json()); //JSON middleware
server.use(bodyParser.urlencoded({ extended: true }));


/**
 * SERVER ROUTERS
 */

//todo router
var todoRouter = require("./routes/todos");
server.use('/api/todo', todoRouter);


/**
 * CATCH ALL
 */

server.all("/*", function(req, res) {
    console.log(`Rogue ${req.method} request @${req.connection.remoteAddress}`);
    res.send({
        method: `${req.method}`,
        sourceip: `${req.connection.remoteAddress}`,
        message: "Invalid request",
        aborted: `${req.aborted}`,
        body: `${req.body}`
    });
});

/**
 * SERVER LISTENER
 */

//user is attempting to use multiport mode.
//create the correct amount of sockets to accomidate them.
if (serverConf.portStart < serverConf.portEnd) {
    for (var sport = serverConf.portStart; sport < serverConf.portEnd; sport++) {

        server.listen(sport, serverConf.ip, function() {
            //Success
            console.log(`Socket - [ OK ]`);
        }).on('error', function(err) {
            //fail
            console.log(err);
            console.log(`Socket - [FAIL]`);
        });
    }
    console.log(`SERVER LISTENING - BOUND ON ${serverConf.ip} ports ${serverConf.portStart} - ${serverConf.portEnd} `);
    console.log(`Multiport mode enabled on range`)


}
//single socket mode. 
else if (serverConf.portStart === serverConf.portEnd) {
    server.listen(serverConf.portStart, serverConf.ip, function() {
        //success
        console.log(`SERVER LISTENING - BOUND ON ${serverConf.ip} port ${serverConf.portStart}`);
    }).on("error", function(err) {
        //failure
        console.log(`Failed to create socket. This port might be used.${err}`);
    });
}
//fail
else {
    console.log("FATAL: Port end cannot be lower than the start");
}