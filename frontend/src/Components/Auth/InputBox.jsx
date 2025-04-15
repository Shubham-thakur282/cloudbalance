const InputBox = (props) => {
  return (
    <div className="login-input">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        id={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.label}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputBox;