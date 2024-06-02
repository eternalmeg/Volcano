const router = require('express').Router();
const volcanoService = require('../services/VolcanoService')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/search', async (req, res) => {
console.log(req.query.name);
console.log(req.query.typeVolcano);
    const volcanoName = req.query.name;
    const volcanoType = req.query.typeVolcano;
let volcanoes;
    if (volcanoName || volcanoType) {
        volcanoes = await volcanoService.search(volcanoName, req.query.typeVolcano);
    } else {
        volcanoes = [];
    }
    console.log(volcanoes);

//let volcanoes = await volcanoService.search(req.query.name, req.query.typeVolcano);

    res.render('search', {volcanoes});

});



module.exports = router;
