import React from "react";
import "./inputs.css";

export const Inputs = ({ isErr, userName, userPhone }) => {
  return (
    <>
      <div className="input__wrapper">
        <div className="error">
          {isErr.name ? "Error" : ""}
          {isErr.name ? <span></span> : ""}
        </div>
        {isErr.name ? (
          <div
            className="errorClose"
            onClick={(event) => {
              userName.errorCloseClick(event.target.nextSibling);
            }}
          >
            &times;
          </div>
        ) : (
          ""
        )}
        <input
          placeholder="Name"
          id="name"
          name="userName"
          type="text"
          className={
            isErr.name ? "input_validate input_error" : "input_validate"
          }
          value={userName.value}
          onChange={userName.onChange}
          onBlur={userName.onBlur}
        />
        <div className="errorMessage">
          {isErr.name ? userName.errorMessage : ""}
        </div>
      </div>

      <div className="input__wrapper">
        <div className="error">{isErr.phone ? "Error" : ""}</div>
        {isErr.phone ? (
          <div
            className="errorClose"
            onClick={(event) => {
              userPhone.errorCloseClick(event.target.nextSibling);
            }}
          >
            &times;
          </div>
        ) : (
          ""
        )}
        <input
          placeholder="Phone"
          id="phone"
          name="userPhone"
          type="text"
          className={
            isErr.phone ? "input_validate input_error" : "input_validate"
          }
          value={userPhone.value}
          onChange={userPhone.onChange}
          onBlur={userPhone.onBlur}
        />
        <div className="errorMessage">
          {isErr.phone ? userPhone.errorMessage : ""}
        </div>
      </div>
    </>
  );
};
