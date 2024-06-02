const mongoose = require('mongoose');
const Volcano = require('../models/Volcano');
const User = require('../models/User');

exports.create = async (userId, volcanoData) => {

    const createdVolcano = await Volcano.create({
        owner: userId,
        ...volcanoData
    });

//update in User collection about created courses with the id of the new created course

    await User.findByIdAndUpdate(userId, {$push: {createdVolcano: createdVolcano._id}});

    return createdVolcano;

};
exports.getAll = () => Volcano.find();

exports.getOne = (volcanoId) => Volcano.findById(volcanoId);

exports.getOneWithDetails = (volcanoId) => this.getOne(volcanoId).populate('owner').populate('voteList');

exports.voted = async (volcanoId, userId) => {
    await Volcano.findByIdAndUpdate(volcanoId, { $push: {voteList: userId }}, {runValidators: true});
    await User.findByIdAndUpdate(userId, { $push: { votedVolcano: volcanoId}}, {runValidators: true});

};

exports.delete = (volcanoId) => Volcano.findByIdAndDelete(volcanoId);

exports.edit = (volcanoId, volcanoData) => Volcano.findByIdAndUpdate(volcanoId, volcanoData, {runValidators: true});

exports.search = (volcanoName, volcanoType ) => Volcano.find({name: {$regex: volcanoName, $options: 'i' }, typeVolcano: {$regex: volcanoType}}).lean();