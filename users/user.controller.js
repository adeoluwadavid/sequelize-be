const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const authorize = require('../middleware/authorize')
const userService = require('./user.service');

router.post('/register', registerSchema, register);
router.post('/login', logInSchema, logIn);
router.post('/postjobs/:id', postJobsSchema,postJobs)
router.post('/updatejobs/:id', postJobsSchema,updateJobs)

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}
function postJobs(req, res, next) {
    userService.postJobs(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}
function updateJobs(req, res, next) {
    userService.updateJobs(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}


function register(req, res, next) {
    userService.register(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function logInSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function logIn(req, res, next) {
    userService.logIn(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function postJobsSchema(req, res, next){
    const schema = Joi.object({
        title: Joi.string().required(),
        technologies: Joi.string().required(),
        description: Joi.string().required(),
        budget: Joi.string().required(),
        contact_email: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}


module.exports = router;