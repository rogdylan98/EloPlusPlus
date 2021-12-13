import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, Redirect } from 'react-router-dom';
import './QuestionFeed.css';
import { getQuestions } from '../../store/question';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import QuestionDetails from '../QuestionDetails';
import SplashPage from '../SplashPage';

const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const questions = useSelector(state => state.question);
    const user = useSelector(state => state.session.user);
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [showFormCreate, setShowFormCreate] = useState(false);


    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    if (!user) {
       return <Redirect to="/" />
    }
    if (!questions ) {
        return null;
    }
    return (
        <div>
            <button className="askQuestion" onClick={() => setShowFormCreate(true)}>Add Question</button>
            {!selectedQuestion && (<nav>
                {Object.values(questions).map(question =>
                <main className="questionBlock">
                    <NavLink key={question.id} to={`/question/${question.id}`}>
                        <h1 className="questionTitle">{question.title}</h1>
                    </NavLink>
                </main>
                )}
            </nav>)}
            {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {/* {selectedQuestion && <QuestionDetails question={selectedQuestion} clickHandler={() => {setSelectedQuestion(null)}} />} */}
        </div>
    )
}

export default QuestionFeed;
