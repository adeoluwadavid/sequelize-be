const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const authorization = require('../middleware/authorization')
const userService = require('./user.service');

router.post('/register', registerSchema, register);
router.post('/login', logInSchema, logIn);
router.post('/postjobs/:id', authorization,postJobsSchema,postJobs)
router.put('/updatejobs/:id', authorization,updateJobs)
router.delete('/deletejob/:id', authorization,deleteJob)
router.delete('/deletejobs/:id',authorization, deleteAllJobs);
router.get('/getjobs/:id', authorization, getAllJobs)

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(5).required()
    });
    validateRequest(req, next, schema);
}
function postJobs(req, res, next) {
    userService.postJobs(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}
function updateJobs(req, res, next) {
    console.log("**HERE**")
    userService.updateJobs(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAllJobs(req, res, next){
    userService.getAllJobs(req.params.id).then((user)=> res.json(user)).catch(next)
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
function updateJobsSchema(req, res, next){
    const schema = Joi.object({
        title: Joi.string(),
        technologies: Joi.string(),
        description: Joi.string(),
        budget: Joi.string(),
        contact_email: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function deleteJob(req, res, next) {
    userService.deleteJob(req.params.id)
        .then(() => res.json({ message: 'Job deleted successfully' }))
        .catch(next);
}
function deleteAllJobs(req, res, next) {
    userService.deleteAllJobs(req.params.id)
        .then(() => res.json({ message: 'All Jobs deleted successfully' }))
        .catch(next);
}
module.exports = router;