import argparse

from nltk.corpus import words

all_words = words.words()
# print(len(all_words))

ALL_FIVE_CHAR_WORDS = [word.lower().strip() for word in all_words if len(word) == 5]

# Remove duplicates
FIVE_CHAR_WORDS = list(set(ALL_FIVE_CHAR_WORDS))

# with open('words.txt', 'w') as f:
#   f.write('\n'.join(FIVE_CHAR_WORDS))

ESCAPE_CHARS = {' ', '_'}
# print(len(FIVE_CHAR_WORDS))

parser = argparse.ArgumentParser(
                    prog = 'WordleHack',
                    description = 'Provide any 5 letters (unknown letters should be blank " " or underscore "_". A response of all matching words)'
                    )

parser.add_argument('word')

parser.add_argument('-a', '--any', default='')
parser.add_argument('-w', '--without', default='')

def word_contains_any_letters(word: str, letters: str):
  for good_letter in letters:
    if good_letter in word:
      return True
  return False

def hack_wordle(word: str, with_any: str, without: str):
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
  
  if with_any:
    new_good_words = []
    for good_word in good_words:
      if word_contains_any_letters(good_word, with_any):
        new_good_words.append(good_word)
    good_words = new_good_words
  
  if without:
    new_good_words = []
    for good_word in good_words:
      if not word_contains_any_letters(good_word, without):
        new_good_words.append(good_word)
    good_words = new_good_words


  if len(good_words) == 0:
    print('No words found')
  else:
    for good_word in good_words:
      print(good_word)

if __name__ == '__main__':
  args = parser.parse_args()
  word = args.word
  with_any = args.any
  without = args.without
  print('with_any', with_any)
  print('without', without)

  hack_wordle(word, with_any, without)