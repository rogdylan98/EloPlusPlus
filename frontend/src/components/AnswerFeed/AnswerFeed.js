import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, Redirect } from 'react-router-dom';
import { getAnswers} from '../../store/answer';
import CreateQuestionForm from '../QuestionForm/CreateQuestionForm';
import QuestionDetails from '../QuestionDetails';
import SplashPage from '../SplashPage';

const AnswerFeed = (answers) => {
    // const dispatch = useDispatch();
    // const questions = useSelector(state => state.question);
    // console.log("answers", answers);
    const user = useSelector(state => state.session.user);
    // console.log(questionId);
    // useEffect(()=> {
    //     console.log("HERE");
    //     dispatch(getAnswers(questionId.questionId));
    // }, [dispatch, questionId]);

    // const answers = useSelector(state => state.answer);
    // console.log("ANSWERS",Object.values(answers));
    if (!user) {
        return <Redirect to="/" />
     }
    if (!answers) {
        return null;
    }
    return (
        <div>
            {
                answers.map(answer =>
                    <div className="answerBlock">
                        <NavLink key={answer.id} to={`/answer/${answer.id}`}>
                            <h1 className="answerBody">{answer.body}</h1>
                        </NavLink>
                    </div>
                )
            }
        </div>
)
}
export default AnswerFeed
