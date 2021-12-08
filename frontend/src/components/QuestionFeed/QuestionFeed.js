import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getQuestions } from '../../store/question';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';

const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const question = useSelector(state => state.question);
    const [showForm, setShowForm] = useState(false);
    console.log("LOOK HERE!", question)
    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!question) {
        return null;
    }

    return (
        <main>
            <button onClick={() => setShowForm(true)}>Ask a Question!</button>
            <nav>
                {Object.values(question).map(question => <NavLink key={question.id} to={`/question/${question.id}`}>
                <h1>{question.title}</h1>
                </NavLink>)}
            </nav>
            {showForm ? (
                <CreateQuestionForm hideForm={() => setShowForm(false)}/>
            ) : (null) }
        </main>
    )
}

export default QuestionFeed;
