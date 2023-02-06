import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { setExactLetter, selectExactLetters } from "./wordleInputsSlice";

import HelpIcon from '../../sharedComponents/helpIcon';

import styles from "./WordleInputs.module.css";

function ExactLetter(props) {
  const { letterValue, letterPosition } = props;
  const dispatch = useDispatch();
  return (
    <input
      className={`form-control ${styles.exactLetter}`}
      type="text"
      onChange={(e) =>
        dispatch(
          setExactLetter({ letterPosition, letterValue: e.target.value })
        )
      }
      value={letterValue}
    />
  );
}

export function WordleInputs() {
  const exactLetters = useSelector(selectExactLetters);
  return (
    <Col>
      <h3>Wordle Cheat Form</h3>
      <Form id="words_form">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Exact Letters Positions
            {' '}
            <HelpIcon id="exact-letters" text="Provide known letters in their exact positions (green letters)" />
            :
          </Form.Label>
          <Col sm={7}>
            {exactLetters.map((letterValue, letterPosition) => (
              <ExactLetter
                key={`exact-letter-${letterPosition}`}
                letterValue={letterValue}
                letterPosition={letterPosition}
              />
            ))}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Other Letters
            {' '}
            <HelpIcon id="other-letters" text="Include any other letters where their exact position is not known (yellow letters)" />
            :
          </Form.Label>
          <Col sm={5}>
            {" "}
            <input
              className="form-control"
              type="text"
              id="known_letters"
              // value=""
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Ignored Letters
            {' '}
            <HelpIcon id="ignored-letters" text="Provide any other letters that should be excluded (grey letters)" />
            :
          </Form.Label>

          <Col sm={5}>
            {" "}
            <input
              className="form-control"
              type="text"
              id="ignore_letters"
              // value=""
            />
          </Col>
        </Form.Group>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </Form>
    </Col>
  );
}
