const INITIAL_STATE = {
  values: {
    email: '',
    password: '',
  },
  errors: {
    email: '',
    password: '',
  },
};

const ACTIONS = {
  email: 'CHANGE_EMAIL',
  password: 'CHANGE_PASSWORD',
  formReset: 'FORM_RESET',
  setError: 'SET_ERROR',
};

const errorsHandler = (payload) => payload.reduce((acc, { path, message }) => {
  acc[path] = message;
  return acc;
}, {});

const formReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.email:
      return {
        ...state,
        values: {
          ...state.values,
          email: payload
        },
        errors: {
          ...state.errors,
          email: '',
        },
      };
    case ACTIONS.password:
      return {
        ...state,
        values: {
          ...state.values,
          password: payload
        },
        errors: {
          ...state.errors,
          password: '',
        },
      };
    case ACTIONS.setError:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...errorsHandler(payload.inner),
        },
      };
    case ACTIONS.formReset:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {
  formReducer,
  ACTIONS,
  INITIAL_STATE,
};
