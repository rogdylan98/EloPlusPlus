import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, Redirect } from 'react-router-dom';
import './QuestionFeed.css';
import { getQuestions } from '../../store/question';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import QuestionDetails from '../QuestionDetails';
import SplashPage from '../SplashPage';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';
const QuestionFeed = () => {
    const dispatch = useDispatch();
    // const { questionId } = useParams();
    const questions = useSelector(state => state.question);
    const user = useSelector(state => state.session?.user);
    console.log(user);
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [home, setHome] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    useEffect(()=> {
        dispatch(getQuestions());
    }, [dispatch]);
    // if (!user) {
    //    return <Redirect to="/" />
    // }
    if (!questions ) {
        return null;
    }
    return (
        <div className='questionFeed'>
        <div>
            <button onClick={() => setHome(true)}>Home</button>
            <button onClick={() => setShowFormCreate(true)}>Add Question</button>
            <button onClick={() => setShowLogout(true)}>Logout</button>
        </div>
            <h1 className='feed'>Question Feed</h1>
            {!selectedQuestion && (<div className="questionBlock">
                {Object.values(questions).map(question =>
                <div>
                    <NavLink key={question.id} to={`/question/${question.id}`}>
                        <h2 className="questionTitle">{question.title}</h2>
                    </NavLink>
                </div>
                )}
            </div>)}
            {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {selectedQuestion && <QuestionDetails question={selectedQuestion} clickHandler={() => {setSelectedQuestion(null)}} />}
            {home && <Redirect to={'/questions'}/>}
            {showLogout && <ProfileButton user={user} prop={showLogout}/>}
        </div>
    )
}

export default QuestionFeed;
