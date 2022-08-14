import classNames from "classnames";
function Input({ label, name, error, ...rest }) {
  return (
    <>
      <div className="form-group">
        <label className="fs-3" htmlFor={name}>
          {label}
        </label>
        <input
          {...rest}
          id={name}
          name={name}
          className={classNames("form-control", { "is-invalid": error })}
        />
        <span className="invalid-feedback">{error}</span>
      </div>
    </>
  );
}

export default Input;
