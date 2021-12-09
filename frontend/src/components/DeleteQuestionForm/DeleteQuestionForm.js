import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { deleteQuestion} from '../../store/question';

const DeleteQuestionForm = ({ question, hideForm }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('');
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
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <div className="deleteQuestionForm">
            <form onSubmit={handleSubmit}>
            <button type="submit" >Confirm Delete</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default DeleteQuestionForm;
