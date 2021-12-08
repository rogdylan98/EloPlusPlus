

const LOAD = 'question/LOAD';
const ADD_ONE = 'question/ADD_ONE';
const DELETE_ONE = 'question/DELETE_ONE';
const UPDATE = 'question/UPDATE';
const load = (list) => ({
    type: LOAD,
    list
});

const addOneQuestion = (question) => ({
    type: ADD_ONE,
    question
});

const deleteOneQuestion = (id) => ({
    type: DELETE_ONE,
    id
});

const updateList = (list) => ({
    type: UPDATE,
    list
})

export const createQuestion = (data) => async (dispatch) => {
    const response = await window.csrfFetch (`/api/question/`, {
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

export const updateQuestion = (data) => async (dispatch) => {
    console.log(data)
    const response = await window.csrfFetch (`/api/question/${data.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const list = await fetch (`/api/question`);
      console.log("SUCCESS")
      dispatch(updateList(list));
      return list;
    }
  };

export const deleteQuestion = (data) => async (dispatch) => {
    const response = await fetch(`/api/items/${data.Id}`, {
        method: 'delete'
      });
      if (response.ok) {
        const question = await response.json();
        dispatch(deleteOneQuestion(question.id));
      }
}
const initialState = {
    types: []
};

const questionReducer = (state = initialState, action) => {
    const allQuestions = { ...state };
    switch (action.type) {
        case LOAD: {
            action.list.forEach(question => {
                allQuestions[question.id] = question;
            });
            return allQuestions;
        }
        case ADD_ONE: {
            allQuestions[action.question.id] = action.question;
            return allQuestions;
        }
        case UPDATE: {
            action.list.forEach(question => {
                allQuestions[question.id] = question;
            });
            return allQuestions;
        }
        case DELETE_ONE: {
            if (allQuestions[action.id]) {
                delete allQuestions[action.id]
            }
            return allQuestions;
        }
        default:
            return state;
    }
}

export default questionReducer;
