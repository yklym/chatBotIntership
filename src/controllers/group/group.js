const Group = require("../../db/group.js");


const getAll = (req, res) => {
    Group.getAll().then(groups => {
        res.status(200).json(groups);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const getById = (req, res) => {
    const id = req.params.id;
    Group.getById(id).then(groups => {
        res.status(200).json(groups);
    }).catch(err => {
        res.status(400).json(err);
    });
};

const insert = (req, res) => {
    let groupObj = null;
    try {
        groupObj = new Group(req.body);
    } catch (err) {
        res.status(400).json({ err });
        return;
    }

    Group.insert(groupObj).then(resGroup => {
        res.status(201).json(resGroup);
    }).catch(err => {
        res.status(400).json({ err });
    });
};

const _delete = (req, res) => {
    const id = req.params.id;
    Group.deleteById(id).then(groups => {
        res.status(200).json(groups);
    }).catch(err => {
        res.status(400).json(err);
    });
};

const patch = (req, res) => {
    const id = req.params.id;
    Group.update(id, req.body).then(resGroup => {
        res.status(201).json(resGroup);
    }).catch(err => {
        res.status(400).json(err);
    });
};

const update = (req, res) => {
    const id = req.params.id;
    let lessObj = null;
    try {
        lessObj = new Group(req.body);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
    Group.update(id, lessObj).then(resGroup => {
        res.status(201).json(resGroup);
    }).catch(err => {
        res.status(400).json(err);
    });
};


// TODO Advanced Routers
module.exports = {
    delete: _delete,
    patch,
    update,
    getAll,
    getById,
    insert,
};
