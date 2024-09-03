import * as yup from 'yup';
import { useEffect, useReducer, useRef } from "react";
import { formReducer, INITIAL_STATE, ACTIONS } from "../../formReducer";
import Input from "../input/Input";

const Form = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const nameRef = useRef(null);

  const schema = yup.object().shape({
    name: yup.string().required('Это обязательное поле'),
    password: yup.string().required('Это обязательное поле'),
  });

  const handleChange = (name, value) => {
    dispatch({ type: name, payload: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    schema.validate(state.values, { abortEarly: false })
      .then(() => {
        // fetch('url', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: state.values,
        // })
        console.log(123)
        dispatch({ type: ACTIONS.formReset });
      })
      .catch(error => dispatch({ type: ACTIONS.setError, payload: error}));
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-title">Войти</h1>
      <Input
        className="input"
        name={ACTIONS.name}
        type="text"
        id="login"
        placeholder="Ваш ник"
        nameRef={nameRef}
        value={state.values.name}
        error={state.errors.name}
        handleChange={handleChange}
      />
      <Input
        className="input"
        name={ACTIONS.password}
        type="password"
        id="password"
        placeholder="Введите пароль"
        value={state.values.password}
        error={state.errors.password}
        handleChange={handleChange}
      />
      <button className="form-button" type="submit">Войти</button>
    </form>
  );
};

export default Form;
