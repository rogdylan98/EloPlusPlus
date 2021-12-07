const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const csrf = require('csurf')
const csrfProtection = csrf({cookie:true})
const QuestionRepository = require('../../db/question-repository')

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res){
    const question = await QuestionRepository.list();
    return res.json(question);
}));

router.post(
    '/',
    csrfProtection,
    //insert Validations here,
    asyncHandler(async function (req, res) {
        await QuestionRepository.create(req.body);
        return res.redirect(`/`);
    })
);

router.put(
    '/:id',
    //check validators again here
    asyncHandler(async function (req, res) {
        const id = await QuestionRepository.update(req.body);
        const question = await QuestionRepository.one(id);
        return res.json(question)
    })
);

router.get('/:id', asyncHandler(async function(req, res) {
    const question = await QuestionRepository.one(req.params.id);
    return res.json(question);
  }));

router.get('/delete/:id', asyncHandler(async function(req, res) {
    await QuestionRepository.deleteOne(req.params.id);
    return res.redirect('/');
  }));

module.exports = router;
