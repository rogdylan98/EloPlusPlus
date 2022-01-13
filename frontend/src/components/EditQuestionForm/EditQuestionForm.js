import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestion} from '../../store/question';
import { useHistory, useParams } from 'react-router-dom';

const EditQuestionForm = ({ question, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { questionId } = useParams();
    // console.log("LOOK HERE", useParams())
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('');
    const updateBody = (e) => setBody(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateTopic = (e) => setTopic(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedQ = {
            ...question,
            title,
            body,
            topic
        }
        const updatedQuestion = await dispatch(updateQuestion(updatedQ));
        if (updatedQuestion) {
            history.push(`/questions`);
            console.log(history)
            hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <div className="formDiv">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    required
                    value={title}
                    onChange={updateTitle}
                />
                <input
                    type="text"
                    placeholder="Write your question here!"
                    required
                    value={body}
                    onChange={updateBody}
                />
                <input
                    type="text"
                    placeholder="What game is this related to?"
                    required
                    value={topic}
                    onChange={updateTopic}
                />
            <button type="submit" >Update your Question</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default EditQuestionForm;
