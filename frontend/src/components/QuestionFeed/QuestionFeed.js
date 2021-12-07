import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getQuestions } from '../../store/question';

const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const question = useSelector(state => {
        return state.question.list.map(questionId => state.question[questionId]);
    });
    console.log("LOOK HERE", question)
    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!question) {
        return null;
    }

    return (
        <main>
            <nav>
                {question.map((question) => {
                    return (
                        <h1>{question.body}</h1>
                    )
                })}
            </nav>
        </main>
    )
}

export default QuestionFeed;
