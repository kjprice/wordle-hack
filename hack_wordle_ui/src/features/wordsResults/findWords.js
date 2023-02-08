function wordContainsAllLetters(word, letters) {
  for (const letter of letters.toLowerCase()) {
    if (!word.includes(letter)) {
      return false;
    }
  }

  return true;
}

export function wordContainsAnyLetters(word, letters) {
  for (const letter of letters.toLowerCase()) {
    if (word.includes(letter)) {
      return true;
    }
  }

  return false;
}

function findWords(wordsCounts, exactLetters, otherLetters, ignoredLetters) {
  let goodWords = [...Object.keys(wordsCounts)]; // Make a copy

  // Continuously filter out words, matching letter by letter
  exactLetters.forEach((letter, i) => {
    if (letter === "") {
      return;
    }

    goodWords = goodWords.filter(
      (goodWord) => goodWord[i] === letter.toLowerCase()
    );
  });

  // Words must include these letters
  if (otherLetters.length > 0) {
    goodWords = goodWords.filter((word) =>
      wordContainsAllLetters(word, otherLetters)
    );
  }

  // Words must not include these letters
  if (ignoredLetters.length > 0) {
    goodWords = goodWords.filter(
      (word) => !wordContainsAnyLetters(word, ignoredLetters)
    );
  }

  return goodWords;
}

export default findWords;
