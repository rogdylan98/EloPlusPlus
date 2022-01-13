import { useDispatch} from 'react-redux';
import { deleteQuestion} from '../../store/question';
import { useHistory } from 'react-router-dom';

const DeleteQuestionForm = ({ question, hideForm }) => {
    const dispatch = useDispatch();
    const title = question.title;
    const body = question.body;
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const deleteQ = {
            ...question,
            body,
            title
        }
        const deletedQuestion = await dispatch(deleteQuestion(deleteQ));
        if (deletedQuestion) {
            hideForm();
        }
        history.push("/questions");
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <div className="deleteformDiv">
            <form onSubmit={handleSubmit}>
                <button type="submit">Confirm Delete</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default DeleteQuestionForm;
