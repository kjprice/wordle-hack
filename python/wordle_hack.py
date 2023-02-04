from nltk.corpus import words

all_words = words.words()
print(len(all_words))

FIVE_CHAR_WORDS = [word for word in all_words if len(word) == 5]
print(len(FIVE_CHAR_WORDS))

def hack_wordle(word: str):
  pass

if __name__ == '__main__':
  hack_wordle('party')