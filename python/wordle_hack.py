import argparse

from nltk.corpus import words

all_words = words.words()
# print(len(all_words))

FIVE_CHAR_WORDS = [word for word in all_words if len(word) == 5]
ESCAPE_CHARS = {' ', '_'}
# print(len(FIVE_CHAR_WORDS))

parser = argparse.ArgumentParser(
                    prog = 'WordleHack',
                    description = 'Provide any 5 letters (unknown letters should be blank " " or underscore "_". A response of all matching words)'
                    )

parser.add_argument('word')

def hack_wordle(word: str):
  if len(word) != 5:
    raise ValueError(f'Expected word to have exactly 5 characters but found "{word}"')
  good_words = FIVE_CHAR_WORDS.copy()
  for i, letter in enumerate(word):
    if not letter in ESCAPE_CHARS:
      new_good_words = []
      for good_word in good_words:
        if good_word[i] == letter:
          new_good_words.append(good_word)
      good_words = new_good_words
    # print('')
    # print(len(good_words))

  if len(good_words) == 0:
    print('No words found')
  else:
    for good_word in good_words:
      print(good_word)

if __name__ == '__main__':
  args = parser.parse_args()
  word = args.word

  hack_wordle(word)