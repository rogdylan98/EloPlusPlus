import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import './QuestionFeed.css';
import { getQuestions } from '../../store/question';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm';
import DeleteQuestionForm from '../DeleteQuestionForm/DeleteQuestionForm';

const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const question = useSelector(state => state.question);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showFormDelete, setShowFormDelete] = useState(false);

    console.log("LOOK HERE!", question)
    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!question) {
        return null;
    }

    return (
        <main>
            <button onClick={() => setShowFormCreate(true)}>Ask a Question!</button>
            <nav>
                {Object.values(question).map(question =>
                <div className="questionBlock">
                    <NavLink key={question.id} to={`/question/${question.id}`}>
                        <h1 className="questionTitle">{question.title}</h1>
                    </NavLink>
                    <button onClick={() => setShowFormEdit(true)}>Edit</button>
                    <button onClick={() => setShowFormEdit(true)}>Delete</button>
                </div>
                )}
            </nav>
            {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {showFormEdit ? (
                <EditQuestionForm hideForm={() => setShowFormEdit(false)} question={question}/>
            ) : (null) }
            {showFormDelete ? (
                <DeleteQuestionForm hideForm={() => setShowFormDelete(false)} question={question}/>
            ) : (null) }
        </main>
    )
}

export default QuestionFeed;
