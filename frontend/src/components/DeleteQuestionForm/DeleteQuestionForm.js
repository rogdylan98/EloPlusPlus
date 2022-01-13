import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { deleteQuestion} from '../../store/question';
import QuestionFeed from '../QuestionFeed';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';

const DeleteQuestionForm = ({ question, hideForm }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('');
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const deleteQ = {
            ...question,
            body,
            title
        }
        console.log(deleteQ);
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
