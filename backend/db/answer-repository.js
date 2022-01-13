const { Answer } = require('./models');

async function create(details) {
    const answer = await Answer.create(details);
    return answer;
}

async function update(details) {
    const id = details.id;
    delete details.id;
    const updatedAnswer = await Answer.update(
        details,
        {
            where: { id }
        }
    );
    return id;
}

async function one(id) {
    return await Answer.findByPk(id)

}

async function list(questionId) {
    const res = await Answer.findAll(
        {
            where: { questionId }
        }
    );
    return res;
}

async function deleteOne(id) {
    const answer = await Answer.findByPk(id);
    return await answer.destroy();
}

module.exports = {
    create,
    update,
    one,
    list,
    deleteOne
}
