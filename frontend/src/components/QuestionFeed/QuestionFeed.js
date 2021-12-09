import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Link, useParams } from 'react-router-dom';
import './QuestionFeed.css';
import { getQuestions } from '../../store/question';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm';
import DeleteQuestionForm from '../DeleteQuestionForm/DeleteQuestionForm';

const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const questions = useSelector(state => state.question);
    // const questions = useSelector(getQuestions)
    console.log(questions)
    // const [showFormCreate, setShowFormCreate] = useState(false);
    // const [showFormEdit, setShowFormEdit] = useState(false);
    // const [showFormDelete, setShowFormDelete] = useState(false);

    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!questions) {
        return null;
    }

    return (
        <main>
            {/* <button onClick={() => setShowFormCreate(true)}>Ask a Question!</button> */}
            <nav>
                {questions.map(question =>
                <div className="questionBlock">
                    <NavLink key={question.id} to={`/question/${question.id}`}>
                        <h1 className="questionTitle">{question.title}</h1>
                    </NavLink>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                )}
            </nav>
            {/* {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {showFormEdit ? (
                <Route to={`question/${question.id}`}>
                    <EditQuestionForm hideForm={() => setShowFormEdit(false)} question={question.id}/>
                </Route>
            ) : (null) }
            {showFormDelete ? (
                <DeleteQuestionForm hideForm={() => setShowFormDelete(false)} question={question[question.id]}/>
            ) : (null) } */}
        </main>
    )
}

export default QuestionFeed;
