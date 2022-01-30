const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database.js');

module.exports = {
    logIn,
    register,
    updateJobs,
    deleteJob,
    deleteAllJobs,
    postJobs,
    getAllJobs
};

async function logIn({ username, password }) {
    const user = await db.models.User.scope('withHash').findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password || user.dataValues.password)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function postJobs(id,params){
    params.user_id = id;
    return await db.models.Jobs.create(params);
}

async function register(params) {
    // validate
    if (await db.models.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.models.User.create(params);
}

async function updateJobs(id, params) {
    const job = await getJob(id);

    // copy params to user and save
    Object.assign(job, params);
    return await job.save();

}

async function deleteJob(id) {
    const job = await getJob(id);
    await job.destroy();
}
async function deleteAllJobs(id) {
    await deletingAllJobs(id);
    
}


async function deletingAllJobs(id) {
    const job = await db.models.Jobs.destroy({
        where:{
            user_id: id
        }
    });
    if (!job) throw 'User not found';
    return job;
}
async function getJob(id) {
    const job = await db.models.Jobs.findByPk(id);
    if (!job) throw 'User not found';
    return job;
}

async function getAllJobs(id){
    const job = await db.models.Jobs.findAll({
        where:{
            user_id: id
        }
    });
    if (!job) throw 'User not found';
    return job;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}