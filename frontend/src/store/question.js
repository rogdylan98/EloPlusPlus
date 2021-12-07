const LOAD = 'question/LOAD';
const ADD_ONE = 'question/ADD_ONE';

const load = (list) => ({
    type: LOAD,
    list
});

const addOneQuestion = (question) => ({
    type: ADD_ONE,
    question
});

export const createQuestion = (data) => async (dispatch) => {
    const response = await fetch (`api/questions/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const question = await response.json();
        dispatch(addOneQuestion(question));
        return question
    }
};

export const getQuestions = () => async (dispatch) => {
    const response = await fetch (`/api/question`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const initialState = {
    types: []
}

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allQuestions = {};
            action.list.forEach(question => {
                allQuestions[question.id] = question;
            });
            return {
                ...allQuestions,
                ...state
            }
        }
        default:
            return state;
    }
}

export default questionReducer;
