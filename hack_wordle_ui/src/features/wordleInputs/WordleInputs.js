import styles from "./WordleInputs.module.css";

export function WordleInputs() {
  return (
    <div className="col">
      <h3>Wordle Cheat Form</h3>
      <form id="words_form">
        <div className="row mb-3">
          <label className="col-sm-5 col-form-label" for="exact_letters-1">
            Exact Letters Positions
            <i
              className="bi-info-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="Provide known letters in their exact positions (green letters)"
            ></i>
            :
          </label>
          <div className="col-sm-7">
            <input
              className={`form-control ${styles.exactLetter}`}
              type="text"
              id="exact_letters-1"
              value=""
            />
            <input
              className={`form-control ${styles.exactLetter}`}
              type="text"
              id="exact_letters-2"
              value=""
            />
            <input
              className={`form-control ${styles.exactLetter}`}
              type="text"
              id="exact_letters-3"
              value=""
            />
            <input
              className={`form-control ${styles.exactLetter}`}
              type="text"
              id="exact_letters-4"
              value=""
            />
            <input
              className={`form-control ${styles.exactLetter}`}
              type="text"
              id="exact_letters-5"
              value=""
            />
          </div>
        </div>
        <br />
        <div className="row mb-3">
          <label className="col-sm-5 col-form-label">
            Other Letters
            <i
              className="bi-info-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="Include any other letters where their exact position is not known (yellow letters)"
            ></i>
            :
          </label>
          <div className="col-sm-5">
            {" "}
            <input
              className="form-control"
              type="text"
              id="known_letters"
              value=""
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-5 col-form-label">
            Ignored Letters
            <i
              className="bi-info-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="Provide any other letters that should be excluded (grey letters)"
            ></i>
            :
          </label>

          <div className="col-sm-5">
            {" "}
            <input
              className="form-control"
              type="text"
              id="ignore_letters"
              value=""
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
