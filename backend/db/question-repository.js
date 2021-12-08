const { Question } = require('./models');

async function create(details) {
    const question = await Question.create(details);
    return question;
}

async function update(details) {
    const id = details.id;
    delete details.id;
    await Question.update(
        details,
        {
            where: { id },
            returning: true,
            plain: true,
        }
    );
    return id;
}

async function one(id) {
    return await Question.scope("detailed").findByPk(id)
}

async function list() {
    return await Question.findAll();
}

async function deleteOne(id) {
    return await Question.findByPk(id).destroy();
}

module.exports = {
    create,
    update,
    one,
    list,
    deleteOne
}
