import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectExactLetters,
  selectOtherLetters,
  selectIgnoredLetters,
} from "../wordleInputs/wordleInputsSlice";

import styles from "./WordleKeyboard.module.css";

const KEYBOARD_FIELD_POSITIONS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split(""),
];

function getCssClassFromColor(color) {
  switch(color) {
    case 'green':
      return styles.letterColorGreen;
      case 'yellow':
        return styles.letterColorYellow;
        case 'gray':
          return styles.letterColorGray;
        
        case 'white':
          return '';
        default:
          throw TypeError(`Unknown color: ${color}`);
  }
}

function KeyboardField(props) {
  const { letterColor } = props;
  const className = `${styles.keyboardLetter} ${getCssClassFromColor(letterColor.color)}`
  console.log('getCssClassFromColor(letterColor.color)', getCssClassFromColor(letterColor.color));
  return <div className={className}>{letterColor.letter}</div>;
}

function KeyboardRow(props) {
  const { letterColorsRow } = props;
  return (
    <div className={styles.keyboardRow}>
      <div className={styles.keyboardRowContainer}>
        <div className={styles.keyboardRowFixer}>
          {letterColorsRow.map((letterColor) => (
            <KeyboardField key={letterColor.letter} letterColor={letterColor} />
          ))}
        </div>
      </div>
    </div>
  );
}

class LetterColor{
  constructor(letter, color) {
    this.letter = letter;
    this.color = color;
  }
}

class LetterColorRow {
  constructor(letters, letterColorsRow) {
    this.letters = letters;
    this.letterColorsRow = letterColorsRow;
  }
}

function getLetterColorRows(exactLetters, otherLetters, ignoredLetters) {
  return KEYBOARD_FIELD_POSITIONS.map(row => {
    const letterColorsRow = row.map(letter => {
      if (exactLetters.includes(letter)) {
        return new LetterColor(letter, 'green');
        // return 'exact';
      }
      if (otherLetters.includes(letter)) {
        return new LetterColor(letter, 'yellow');
      }
      if (ignoredLetters.includes(letter)) {
        return new LetterColor(letter, 'gray');
      }
  
      return new LetterColor(letter, 'white');
    });

    return new LetterColorRow(row, letterColorsRow);
  })
}

function WordleKeyboard() {
  const exactLetters = useSelector(selectExactLetters);
  const otherLetters = useSelector(selectOtherLetters);
  const ignoredLetters = useSelector(selectIgnoredLetters);
  console.log({exactLetters});
  console.log({otherLetters});
  console.log({ignoredLetters});

  const letterColorRows = getLetterColorRows(exactLetters, otherLetters, ignoredLetters);

  return (
    <div>
      {letterColorRows.map((letterColorsRow) => (
        <KeyboardRow key={letterColorsRow.letters} letterColorsRow={letterColorsRow.letterColorsRow} />
      ))}
    </div>
  );
}

export default WordleKeyboard;
