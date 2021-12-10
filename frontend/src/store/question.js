
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

const deleteOneQuestion = (id, list) => ({
    type: DELETE_ONE,
    id
});

const updateQ = (id, question) => ({
    type: UPDATE,
    id,
    question
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
        await dispatch(addOneQuestion(question));
        return question
    }
};

export const getOneQuestion = (id) => async (dispatch) => {
    const response = await fetch(`/api/question/${id}`);

    if (response.ok) {
      const question = await response.json();
      dispatch(addOneQuestion(question));
    }
  };

export const getQuestions = () => async (dispatch) => {
    const response = await fetch (`/api/question`);
    if (response.ok) {
        const list = await response.json();
        await dispatch(load(list));
    }
}

export const updateQuestion = (data) => async (dispatch) => {
    console.log(data);
    const response = await window.csrfFetch (`/api/question/${data.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
    //   const getResponse = await fetch (`/api/question`);
    //   const list = await getResponse.json();
    //   console.log("SUCCESS")
    //   dispatch(updateList(list));
    //   return list;
        // const question = await response.json;
        console.log("DATA", data);
        dispatch(updateQ(data.id, data));
        return data;
    }
  };


export const deleteQuestion = (data) => async (dispatch) => {
    console.log(data);
    const response = await fetch(`/api/question/delete/${data.id}`, {
        method: 'get'
      });
      if (response.ok) {
        dispatch(deleteOneQuestion(data.id));
        return response;
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
            allQuestions[action.id] = action.question;
            return allQuestions;
        }
        case DELETE_ONE: {
            delete allQuestions[action.id];
            return allQuestions;
        }
        default:
            return state;
    }
}

export default questionReducer;
