import React from "react";

export default function Color({ name, onClick, location }) {
  return (
        <button id="btnSubmit" 
            className="btn btn-primary form-control btn-block" 
            type="button"
            value={name}
            onClick={onClick}
        >{name}
        </button>
  );
}