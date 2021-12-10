import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import './QuestionFeed.css';
import { getQuestions } from '../../store/question';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import QuestionDetails from '../QuestionDetails';

const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const questions = useSelector(state => state.question);
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [showFormCreate, setShowFormCreate] = useState(false);


    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!questions) {
        return null;
    }

    return (
        <main>
            <button className="askQuestion" onClick={() => setShowFormCreate(true)}>Add Question</button>
            {!selectedQuestion && (<nav>
                {Object.values(questions).map(question =>
                <div className="questionBlock">
                    <NavLink key={question.id} to={`/question/${question.id}`}>
                        <h1 className="questionTitle">{question.title}</h1>
                    </NavLink>
                </div>
                )}
            </nav>)}
            {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {/* {selectedQuestion && <QuestionDetails question={selectedQuestion} clickHandler={() => {setSelectedQuestion(null)}} />} */}
        </main>
    )
}

export default QuestionFeed;
