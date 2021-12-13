import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm';
import DeleteQuestionForm from '../DeleteQuestionForm/DeleteQuestionForm';
import { updateQuestion, getOneQuestion, getQuestions } from '../../store/question';
import QuestionFeed from '../QuestionFeed';
import AnswerFeed from '../AnswerFeed';
import { getAnswers } from '../../store/answer';
const QuestionDetails = () => {
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const {questionId} = useParams();
    const dispatch = useDispatch();

    console.log(questionId);
    const question = useSelector(state => state.question[questionId]);
    const userId = useSelector(state => state.session.user?.id);
    const answers = useSelector(state => state.answer);

    useEffect(() => {
      dispatch(getAnswers(questionId));
    }, [dispatch]);
    console.log(answers);
    // console.log("userId", userId);
    // console.log("questionId", question.userId);
    // console.log(question);
    const [selectedQuestionEdit, setSelectedQuestionEdit] = useState();
    const [selectedQuestionDelete, setSelectedQuestionDelete] = useState();

  if (!question || !userId) {
      return <QuestionFeed />
  }

    // const currentQId = question.id;
    // const currentQ = useSelector(state => state.question[currentQId]);
    // console.log("currentQ", currentQ);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(updateQuestion(question));
    // }, [dispatch, question]);
    return (
        <div>
            <NavLink to="/questions">
                <button>Back</button>
            </NavLink>
            <div>
                <h1>{question.title}</h1>
                <h2>{question.body}</h2>
                {userId === question.userId ? (
                    <div>
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
             {/* <AnswerFeed answers={answers}/> */}
             <div>
             {
                Object.values(answers).map(answer =>
                    <div className="answerBlock">
                        <NavLink key={answer.id} to={`/answer/${answer.id}`}>
                            <h1 className="answerBody">{answer.body}</h1>
                        </NavLink>
                    </div>
                )
            }
             </div>
            {showFormEdit ? (
                <EditQuestionForm hideForm={() => setShowFormEdit(false)} question={selectedQuestionEdit}/>
            ) : (null) }
            {showFormDelete ? (
                <DeleteQuestionForm hideForm={() => setShowFormDelete(false)} question={selectedQuestionDelete}/>
            ) : (null) }
        </div>
    )
}

export default QuestionDetails;
