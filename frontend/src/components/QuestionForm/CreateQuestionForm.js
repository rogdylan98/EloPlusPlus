import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion} from '../../store/question';
import { useHistory } from 'react-router-dom';

const CreateQuestionForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('');
    const updateBody = (e) => setBody(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateTopic = (e) => setTopic(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body,
            title
        }
        const question = await dispatch(createQuestion(payload));
        if (question) {
            history.push(`/`);
            hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <div className="questionForm">
            <form onSubmit={handleSubmit}>
                {/* <input type="hidden" name="_csrf" value="<%= csrftoken %>"/> */}
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
            <button type="submit" >Create a Question</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateQuestionForm;
