import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import EditQuestionForm from '../EditQuestionForm/EditQuestionForm';
import DeleteQuestionForm from '../DeleteQuestionForm/DeleteQuestionForm';
import { updateQuestion } from '../../store/question';

const QuestionDetails = ({question, clickHandler}) => {
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const [selectedQuestionEdit, setSelectedQuestionEdit] = useState();
    const [selectedQuestionDelete, setSelectedQuestionDelete] = useState();
    const currentQId = question.id;
    const currentQ = useSelector(state => state.question[currentQId]);
    console.log("currentQ", currentQ);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateQuestion(currentQ));
    }, [dispatch, currentQ]);


    console.log("clickHandler", clickHandler);
    return (
        <main>
            <button onClick={clickHandler}>Back</button>
            <div>
                <h1>{question.title}</h1>
                <h2>{question.body}</h2>
                <button onClick={() => {
                            setSelectedQuestionEdit(question)
                            setShowFormEdit(true)
                        }}>Edit</button>
                <button onClick={() => {
                            setSelectedQuestionDelete(question)
                            setShowFormDelete(true)
                        }}>Delete</button>
            </div>
            {showFormEdit ? (
                <EditQuestionForm hideForm={() => setShowFormEdit(false)} question={selectedQuestionEdit}/>
            ) : (null) }
            {showFormDelete ? (
                <DeleteQuestionForm hideForm={() => setShowFormDelete(false)} question={selectedQuestionDelete}/>
            ) : (null) }
        </main>
    )
}

export default QuestionDetails;
