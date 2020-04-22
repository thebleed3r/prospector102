const router = require('express').Router();

let Prospection = require('../models/prospects.model');

router.route('/').get( (req, res) => {
    Prospection.find()
        .then(prospections => res.json(prospections))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post( (req, res) => {
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;
    const location = req.body.location;
    const applicationDate = Date.parse(req.body.applicationDate);
    const contact = req.body.contact;
    const response = req.body.response;

    const newProspection = new Prospection({
        companyName,
        jobTitle,
        location,
        applicationDate,
        contact,
        response
    });
    
    newProspection.save()
        .then( () => res.json('Prospection added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get( (req, res) => {
    Prospection.findById(req.params.id)
        .then(prospection => res.json(prospection))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete( (req, res) => {
    Prospection.findByIdAndDelete(req.params.id)
     .then( () => res.json('Prospection deleted'))
     .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/:id').post( (req, res) => {
    Prospection.findById(req.params.id)
        .then(prospection => {
            prospection.companyName = req.body.companyName;
            prospection.jobTitle = req.body.jobTitle;
            prospection.location = req.body.location;
            prospection.applicationDate = Date.parse(req.body.applicationDate);
            prospection.contact = req.body.contact;
            prospection.response = req.body.response;

            prospection.save()
                .then( () => res.json('Prospection updated!'))
                .catch(err => res.status(400).json('Error:' + err));
        });
});

module.exports = router;