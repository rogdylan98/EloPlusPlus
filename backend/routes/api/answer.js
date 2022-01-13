
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const AnswerRepository = require('../../db/answer-repository');
const QuestionRepository = require('../../db/question-repository');
const router = express.Router();

router.get('/:id', asyncHandler(async function(req, res){
    const answers = await AnswerRepository.list(req.params.id);
    return res.json(answers);
}));

router.post(
    '/',
    //insert Validations here,
    asyncHandler(async function (req, res) {
        const answer = await AnswerRepository.create(req.body);
        return res.json(answer)
    })
);

router.put(
    '/:id',
    //check validators again here
    asyncHandler(async function (req, res) {
        const id = await AnswerRepository.update(req.body);
        const answer = await AnswerRepository.one(id);
        return res.json(answer);
    })
);


router.get('/delete/:id', asyncHandler(async function(req, res) {
    await AnswerRepository.deleteOne(req.params.id);
    return res.json(req.params.id);
  }));


  module.exports = router;
