import { csrfFetch } from "./csrf";
const LOAD = 'answer/LOAD';
const ADD_ONE = 'answer/ADD_ONE';
const DELETE_ONE = 'answer/DELETE_ONE';
const UPDATE = 'answer/UPDATE';
const load = (list) => ({
    type: LOAD,
    list
});

const addOneAnswer = (answer) => ({
    type: ADD_ONE,
    answer
});

const deleteOneAnswer = (id, list) => ({
    type: DELETE_ONE,
    id
});

const updateA = (id, answer) => ({
    type: UPDATE,
    id,
    answer
})

export const createAnswer = (data) => async (dispatch) => {
    const response = await csrfFetch (`/api/answer/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    if (response.ok) {
        const answer = await response.json();
        dispatch(addOneAnswer(answer));
        return answer
    }
};

export const getOneAnswer = (id) => async (dispatch) => {
    const response = await fetch(`/api/answer/${id}`);

    if (response.ok) {
      const answer = await response.json();
      dispatch(addOneAnswer(answer));
    }
  };

export const getAnswers = (questionId) => async (dispatch) => {
    const response = await fetch (`/api/answers/${questionId}`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const updateAnswer = (data) => async (dispatch) => {
    console.log(data);
    const response = await csrfFetch (`/api/answer/${data.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
    //   const getResponse = await fetch (`/api/answer`);
    //   const list = await getResponse.json();
    //   console.log("SUCCESS")
    //   dispatch(updateList(list));
    //   return list;
        // const answer = await response.json;
        console.log("DATA", data);
        dispatch(updateA(data.id, data));
        return data;
    }
  };


export const deleteAnswer = (data) => async (dispatch) => {
    console.log(data);
    const response = await fetch(`/api/answer/delete/${data.id}`, {
        method: 'get'
      });
      if (response.ok) {
        dispatch(deleteOneAnswer(data.id));
        return response;
      }
}
const initialState = {};

const answerReducer = (state = initialState, action) => {
    const allAnswers = {};
    switch (action.type) {
        case LOAD: {
            action.list.forEach(answer => {
                allAnswers[answer.id] = answer;
            });
            return allAnswers;
        }
        case ADD_ONE: {
            allAnswers[action.answer.id] = action.answer;
            return allAnswers;
        }
        case UPDATE: {
            allAnswers[action.id] = action.answer;
            return allAnswers;
        }
        case DELETE_ONE: {
            delete allAnswers[action.id];
            return allAnswers;
        }
        default:
            return state;
    }
}

export default answerReducer;
