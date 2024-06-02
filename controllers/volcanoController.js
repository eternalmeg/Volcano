const router = require('express').Router();
const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth} = require("../middlewares/authMiddleWare");
const volcanoService = require('../services/VolcanoService')

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;

    try {
        await volcanoService.create(req.user._id, volcanoData);

       res.redirect('/volcanoes')
    } catch (err) {
        res.render('create', {...volcanoData, error: getErrorMessage(err)});
    }
});

router.get('/', async (req, res) => {
    const volcanoes = await volcanoService.getAll().lean();

    res.render('catalog', {volcanoes})
});


router.get('/:volcanoId/details', async (req, res) => {
    const volcano = await volcanoService.getOneWithDetails(req.params.volcanoId).lean();

    const allVotes = volcano.voteList.length;
    const isOwner = volcano.owner._id == req.user?._id;
    const isVoted = volcano.voteList.some(user => user._id == req.user?._id);


    res.render('details', {...volcano, isVoted, isOwner, allVotes});
});

router.get('/:volcanoId/vote', async (req, res) => {

    await volcanoService.voted(req.params.volcanoId, req.user._id);

    res.redirect(`/volcanoes/${req.params.volcanoId}/details`)
});


router.get('/:volcanoId/delete',isVolcanoOwner, async (req, res) => {
    await volcanoService.delete(req.params.volcanoId);

    res.redirect('/volcanoes');
});

router.get('/:volcanoId/edit', isVolcanoOwner, async (req, res) => {
    res.render('edit', { ...req.volcano });

});

router.post('/:volcanoId/edit', isVolcanoOwner, async (req, res) => {
    const volcanoData = req.body;

    try {
        await volcanoService.edit(req.params.volcanoId, volcanoData);
        res.redirect(`/volcanoes/${req.params.volcanoId}/details`)
    } catch (err) {
        res.render('edit', { ...volcanoData, error: getErrorMessage(err)});

    }

})




async function isVolcanoOwner(req, res, next) {
    const volcano =await volcanoService.getOne(req.params.volcanoId).lean();

    if(volcano.owner != req.user?._id) {
        return  res.redirect(`/volcano/${req.params.volcanoId}/details`);
    }

    req.volcano = volcano;
    next()
}
module.exports = router;