import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import {
  setExactLetter,
  setOtherLetters,
  setIgnoredLetters,
  selectExactLetters,
  selectOtherLetters,
  selectIgnoredLetters,
} from "./wordleInputsSlice";

import {
  setFoundWords,
  selectWordsCounts,
} from "../wordsResults/wordResultsSlice";

import HelpIcon from "../../sharedComponents/helpIcon";

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

function findWords(e, wordsList, exactLetters, otherLetters, ignoredLetters) {
  e.preventDefault();
  console.log("yay");
}

export function WordleInputs() {
  const exactLetters = useSelector(selectExactLetters);
  const otherLetters = useSelector(selectOtherLetters);
  const ignoredLetters = useSelector(selectIgnoredLetters);
  const wordsList = useSelector(selectWordsCounts);
  const dispatch = useDispatch();
  return (
    <Col>
      <h3>Wordle Cheat Form</h3>
      <Form
        id="words_form"
        onSubmit={(e) =>
          dispatch(
            setFoundWords(
              findWords(
                e,
                wordsList,
                exactLetters,
                otherLetters,
                ignoredLetters
              )
            )
          )
        }
      >
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Exact Letters Positions{" "}
            <HelpIcon
              id="exact-letters"
              text="Provide known letters in their exact positions (green letters)"
            />
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
            Other Letters{" "}
            <HelpIcon
              id="other-letters"
              text="Include any other letters where their exact position is not known (yellow letters)"
            />
            :
          </Form.Label>
          <Col sm={5}>
            {" "}
            <input
              className="form-control"
              type="text"
              id="known_letters"
              value={ignoredLetters}
              onChange={(e) => dispatch(setIgnoredLetters(e.target.value))}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Ignored Letters{" "}
            <HelpIcon
              id="ignored-letters"
              text="Provide any other letters that should be excluded (grey letters)"
            />
            :
          </Form.Label>

          <Col sm={5}>
            {" "}
            <input
              className="form-control"
              type="text"
              id="ignore_letters"
              value={otherLetters}
              onChange={(e) => dispatch(setOtherLetters(e.target.value))}
            />
          </Col>
        </Form.Group>
        <div>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </Col>
  );
}
