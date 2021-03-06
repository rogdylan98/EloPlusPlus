const { Question } = require('./models');

async function create(details) {
    const question = await Question.create(details);
    return question;
}

async function update(details) {
    const id = details.id;
    delete details.id;
    const updatedQuestion = await Question.update(
        details,
        {
            where: { id }
        }
    );
    return id;
}

async function one(id) {
    return await Question.findByPk(id)

}

async function list() {
    return await Question.findAll();
}

async function deleteOne(id) {
    const q = await Question.findByPk(id);
    return await q.destroy();
}

module.exports = {
    create,
    update,
    one,
    list,
    deleteOne
}
