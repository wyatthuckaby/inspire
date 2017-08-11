var express = require("express");
var mongoose = require("mongoose");


var router = express.Router();

var todoSchema = new mongoose.Schema({
    text: { type: String, required: true }
});

var Todos = mongoose.model('todo', todoSchema);

router.get('/', function(req, res, next) {
    //there is no point in having a search function here
    //(yet)
    Todos.find({}).then((todos) => res.send(todos)).catch(next);
});

router.post('/', function(req, res, next) {
    if (req.body) {
        Todos.create(req.body).then((todo) => {
            res.send({ message: "Success!" });
        }).catch(next);
    }
});

router.delete('/', function(req, res, next) {
    Todos.findByIdAndRemove(req.body.id).then(() => {
        res.send({ message: "its ded" });
    }).catch(next);
});


router.use(handleError);

function handleError(err, req, res, next) {
    console.log(`User @${req.connection.remoteAddress} sent faulty request`);
    if (req.connection.encrypted) {
        console.log(`User on encrypted protocol attempting to use ${req.method}`);
    } else {
        console.log(`User on open protocol attempting to use ${req.method}`);
    }
    res.json({ success: false, error: err.message });
}

module.exports = router;