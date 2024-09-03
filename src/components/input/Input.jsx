import { useState } from 'react';
import cn from 'classnames';
import show from '../../icons/eye-show-svgrepo-com.svg';
import hide from '../../icons/eye-off-svgrepo-com.svg';

const Input = ({
  name,
  type,
  id,
  value,
  handleChange,
  placeholder,
  nameRef,
  error,
  className
}) => {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(showPass => !showPass);
  };

  const inputType = () => {
    if (type !== 'password') {
      return type;
    }
    return showPass ? 'text' : 'password';
  };

  const wrapperClasses = cn('input-wrapper', {
    invalid: !!error,
  });

  return (
    <div className={wrapperClasses}>
      <input
        className={className}
        id={id}
        name={name}
        type={inputType()}
        placeholder={placeholder}
        ref={nameRef}
        value={value}
        onChange={({ target }) => handleChange(name, target.value)}
      />
      {type === 'password' && (
        <button type="button" className="icon-button" disabled={!value} onClick={handleShowPass}>
          {
            showPass
            ?
            <img src={show} alt="show pass icon" />
            :
            <img src={hide} alt="hide pass icon" />
          }
        </button>
      )}
      {error && <p className="feedback">{error}</p>}
    </div>
  );
};

export default Input;
