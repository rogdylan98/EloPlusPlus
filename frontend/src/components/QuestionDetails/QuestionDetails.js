import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import './QuestionDetails.css'
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm';
import DeleteQuestionForm from '../DeleteQuestionForm/DeleteQuestionForm';
import QuestionFeed from '../QuestionFeed';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import { getAnswers } from '../../store/answer';
import ProfileButton from '../Navigation/ProfileButton';

const QuestionDetails = () => {
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const {questionId} = useParams();
    const dispatch = useDispatch();
    const question = useSelector(state => state.question[questionId]);
    const userId = useSelector(state => state.session?.user?.id);
    const user = useSelector(state => state.session?.user);
    const userName = useSelector(state => state.session?.user?.username);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [home, setHome] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        dispatch(getAnswers(questionId));
    }, [dispatch, questionId]);

    const answers = useSelector(state => state.answer);
    const [selectedQuestionEdit, setSelectedQuestionEdit] = useState();
    const [selectedQuestionDelete, setSelectedQuestionDelete] = useState();

  if (!question || !userId) {
      return <QuestionFeed />
  }

    return (
        <div>
            <div>
                <button onClick={() => setHome(true)}>Home</button>
                <button onClick={() => setShowFormCreate(true)}>Add Question</button>
                <button onClick={() => setShowLogout(true)}>Logout</button>
                <h1 className='name'>Elo++</h1>
            </div>
            <div className='aboutMe'>
                <a href="https://github.com/rogdylan98">Github</a>
                <a href="https://www.linkedin.com/in/roger-s-59133b107/">Linkedin</a>
            </div>
            <div className="questionDiv">
                <div className="questionInfo">
                    <h2>User: {userName}</h2>
                    <h1>{question.title}</h1>
                    <h2>{question.body}</h2>
                </div>
                {userId === question.userId ? (
                    <div className="buttons">
                    <button onClick={() => {
                            setSelectedQuestionEdit(question)
                            setShowFormEdit(true)
                        }}>Edit</button>
                <button onClick={() => {
                            setSelectedQuestionDelete(question)
                            setShowFormDelete(true)
                        }}>Delete</button>
                        </div>) : (null)}

            </div>
                {
                    Object.values(answers).map(answer =>
                        <div className="answerBlock">
                            <h1 className="answerBody">{answer.body}</h1>
                        </div>
                    )
                }
             <div>
             </div>
            {showFormEdit ? (
                <EditQuestionForm hideForm={() => setShowFormEdit(false)} question={selectedQuestionEdit}/>
            ) : (null) }
            {showFormDelete ? (
                <DeleteQuestionForm hideForm={() => setShowFormDelete(false)} question={selectedQuestionDelete}/>
            ) : (null) }
            {showFormCreate ? (
                <CreateQuestionForm hideForm={() => setShowFormCreate(false)}/>
            ) : (null) }
            {home && <Redirect to={'/questions'}/>}
            {showLogout && <ProfileButton user={user} prop={showLogout}/>}
        </div>
    )
}

export default QuestionDetails;
