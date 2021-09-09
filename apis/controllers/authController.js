let controller = {};

controller.firstFunction = firstFunction;

function firstFunction(req, res){
    console.log('Auth function is working')
    res.status(200).send('Auth function is working');
}

module.exports = controller;

