import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';


const AnswerFeed = (answers) => {
    const user = useSelector(state => state.session.user);
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
