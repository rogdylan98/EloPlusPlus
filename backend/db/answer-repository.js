const { Answer } = require('./models');

async function create(details) {
    const answer = await Answer.create(details);
    return answer;
}

async function update(details) {
    const id = details.id;
    console.log("DETAISL:", details)
    delete details.id;
    const updatedAnswer = await Answer.update(
        details,
        {
            where: { id }
        }
    );
    console.log("AM I SURE", updatedQuestion)
    return id;
}

async function one(id) {
    // return await Question.scope("detailed").findByPk(id);
    return await Answer.findByPk(id)

}

async function list(questionId) {
    const res = await Answer.findAll(
        {
            where: { questionId }
        }
    );

    console.log("res", res);
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
