let controller = {};

controller.firstFunction = firstFunction;

function firstFunction(req, res){
    console.log('Carbon function is working')
    res.status(200).send('Carbon function is working');
}

module.exports = controller;

