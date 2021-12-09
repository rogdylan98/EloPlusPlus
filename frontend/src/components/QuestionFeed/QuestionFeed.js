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
    const questions = useSelector(state => state.question);
    const [selectedQuestionEdit, setSelectedQuestionEdit] = useState();
    const [selectedQuestionDelete, setSelectedQuestionDelete] = useState();
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showFormDelete, setShowFormDelete] = useState(false);

    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!questions) {
        return null;
    }

    return (
        <main>
            <button className="askQuestion" onClick={() => setShowFormCreate(true)}>Add Question</button>
            <nav>
                {Object.values(questions).map(question =>
                <div className="questionBlock">
                    <NavLink key={question.id} to={`/question/${question.id}`}>
                        <h1 className="questionTitle">{question.title}</h1>
                    </NavLink>
                    <NavLink to={`/question/${question.id}`}>
                        <button onClick={() => {
                            setSelectedQuestionEdit(question)
                            setShowFormEdit(true)
                        }}>Edit</button>
                     </NavLink>
                     <NavLink to={`/question/${question.id}`}>
                        <button onClick={() => {
                            setSelectedQuestionDelete(question)
                            setShowFormDelete(true)
                        }}>Delete</button>
                     </NavLink>
                </div>
                )}
            </nav>
            {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {showFormEdit ? (
                <EditQuestionForm hideForm={() => setShowFormEdit(false)} question={selectedQuestionEdit}/>
            ) : (null) }
            {showFormDelete ? (
                <DeleteQuestionForm hideForm={() => setShowFormDelete(false)} question={selectedQuestionDelete}/>
            ) : (null) }
        </main>
    )
}

export default QuestionFeed;
