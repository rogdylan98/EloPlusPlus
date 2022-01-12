import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import './QuestionDetails.css'
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm';
import DeleteQuestionForm from '../DeleteQuestionForm/DeleteQuestionForm';
import { updateQuestion, getOneQuestion, getQuestions } from '../../store/question';
import QuestionFeed from '../QuestionFeed';
import AnswerFeed from '../AnswerFeed';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import { getAnswers } from '../../store/answer';
const QuestionDetails = () => {
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const {questionId} = useParams();
    const dispatch = useDispatch();

    console.log(questionId);
    const question = useSelector(state => state.question[questionId]);
    const userId = useSelector(state => state.session.user?.id);
    const userName = useSelector(state => state.session.user?.username)
    const answers = useSelector(state => state.answer);
    const [showFormCreate, setShowFormCreate] = useState(false);

    useEffect(() => {
      dispatch(getAnswers(questionId));
    }, [dispatch, questionId]);
    // console.log("userId", userId);
    // console.log("questionId", question.userId);
    // console.log(question);
    const [selectedQuestionEdit, setSelectedQuestionEdit] = useState();
    const [selectedQuestionDelete, setSelectedQuestionDelete] = useState();

  if (!question || !userId) {
      return <QuestionFeed />
  }

    return (
        <div>
            <div>
            <button className="askQuestion" onClick={() => setShowFormCreate(true)}>Add Question</button>
            </div>
            <div className="questionDiv">
                <div className="questionInfo">
                    <h2>User: {userName}</h2>
                    <h1>{question.title}</h1>
                </div>
                <h2>{question.body}</h2>
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
        </div>
    )
}

export default QuestionDetails;
