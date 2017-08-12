var express = require("express");
var mongoose = require("mongoose");


var router = express.Router();

var todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    checked: { type: Boolean, required: true },
    display: { type: Boolean, required: true }
});

var Todos = mongoose.model('todo', todoSchema);

//GET
router.get('/', function(req, res, next) {
    //there is no point in having a search function here
    //(yet)
    Todos.find({}).then((todos) => res.send(todos)).catch(next);
});


//POST
router.post('/', function(req, res, next) {
    if (req.body) {
        Todos.create(req.body).then((todo) => {
            res.send({ message: "Success!" });
        }).catch(next);
    }
});


//DELETE
router.delete('/', function(req, res, next) {
    Todos.findByIdAndRemove(req.body.id).then(() => {
        res.send({ message: "its ded" });
    }).catch(next);
});

/**
 * this put function requires some object 
 * imbedding in order to get this to function
 * in the body only theme im trying to manage. 
 * 
 * Because of this, we need to diviate from the
 * current standard on how the rest of the handles
 * are functioning in order to keep within spec.
 * 
 * the spec for this is as follows:
 * 
 * {
 *  "id": "<ID"
 *  "edit": {
 *  }
 * }
 */
router.put('/', function(req, res, next) {
    //this will help prevent any errors where the request is completly random.
    if (req.body.id && req.body.edit) {
        //things seem to be where they need to be.
        Todos.findByIdAndUpdate(req.body.id, req.body.edit).then(() => {
            res.send({ message: "Success!" });
        }).catch(next);


    } else {
        //something missed in the former if statement.
        res.send({ message: "update failed, validation not accepted" });
    }
});

router.use(handleError);

function handleError(err, req, res, next) {
    /**
     * the following is just data logging for these bad errors.
     * in case of an actual server attack, these might be helpful
     * especially when patching a firewall.
     */
    console.log(`User @${req.connection.remoteAddress} sent faulty request`);
    if (req.connection.encrypted) {
        console.log(`User on encrypted protocol attempting to use ${req.method}`);
    } else {
        console.log(`User on open protocol attempting to use ${req.method}`);
    }
    res.json({ success: false, error: err.message });
}

module.exports = router;