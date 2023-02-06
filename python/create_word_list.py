from collections import Counter
import os
import re
from typing import List

# conda install -c conda-forge pattern
from pattern.en import verbs
# list(wordnet.all_lemma_names())
from nltk.corpus import wordnet, words
from nltk.corpus import europarl_raw
from nltk.corpus import movie_reviews
from nltk.corpus import nps_chat
from nltk.corpus import state_union
from nltk.corpus import twitter_samples
from nltk.corpus import webtext
from nltk.corpus import wordnet

def word_exists(word: str) -> bool:
    return len(wordnet.synsets(word)) > 0

def only_letters(word):
    return re.sub('[^a-z]*', '', word)

def clean_words(words):
    return [only_letters(word.lower().strip()) for word in words]

def get_all_words_cleaned() -> List[str]:
    return words.words() + list(wordnet.all_lemma_names())

class Verb:
    def __init__(self, verb_root: str) -> None:
        self.verb_root = verb_root
        self.verb_conjugations = [verb_root.lower().strip()]
        self.ing_found = False
        self.s_found = False
    
    def get_all(self) -> List[str]:
        for verb in verbs[self.verb_root]:
            if verb != '':
                verb_cleaned = verb.lower().strip()
                self.set_verb_conjugation(verb_cleaned)
        self.set_missing_verbs()

        return self.verb_conjugations
    
    def set_missing_verbs(self):
        if not self.ing_found:
            verb = self.verb_root + 'ing'
            if word_exists(verb):
                self.verb_conjugations.append(verb)
        if not self.s_found:
            verb = self.verb_root + 's'
            if word_exists(verb):
                self.verb_conjugations.append(verb)

                
    def set_verb_conjugation(self, verb_cleaned: str):
        self.verb_conjugations.append(verb_cleaned)
        if verb_cleaned[-1] == 's':
            self.s_found = True
        elif verb_cleaned[-3:] == 'ing':
            self.ing_found = True
        
        

    @staticmethod
    def find_verbs(verb_root) -> List[str]:
        verb_root = Verb(verb_root)
        return verb_root.get_all()


def get_all_verbs() -> List[str]:
    all_verbs = []
    for verb_root in verbs:
        verb_conjugations = Verb.find_verbs(verb_root)
        for verb in verb_conjugations:
            all_verbs.append(verb)

    unique_verbs = sorted(list(set(all_verbs)))
    return unique_verbs

def create_word_list():
    all_words = clean_words(get_all_words_cleaned() + get_all_verbs())

    all_five_char_words = [word for word in all_words if len(word) == 5]

    # Remove duplicates
    unique_five_char_words = sorted(list(set(all_five_char_words)))

    return unique_five_char_words

def get_all_corpora_text():
    corpora_tokens = [
        list(nps_chat.words()),
        list(europarl_raw.english.words()),
        list(state_union.words()),
        list(webtext.words()),
        list(movie_reviews.words()),
        *twitter_samples.tokenized(),
    ]

    all_words = []
    for corpus in corpora_tokens:
        for word in corpus:
            all_words.append(word.lower())
    return all_words

def split_words(word):
    words = re.split('[^a-z]+', word)
    return [word for word in words if len(word) >= 5]

def get_all_texts_with_more_than_five_chars():
    all_words = get_all_corpora_text()
    at_least_five_char_words = [word for word in all_words if len(word) >= 5]

    cleaned_words = []
    for raw_word in at_least_five_char_words:
        for cleaned_word in split_words(raw_word):
            cleaned_words.append(cleaned_word)
    
    five_letter_words = [word for word in cleaned_words if len(word) == 5]
    return Counter(five_letter_words)

def get_all_words_with_count_frequencies():
    all_words_text = create_word_list()
    counter = get_all_texts_with_more_than_five_chars()
    words_with_frequencies = {}
    for word in all_words_text:
        count = 0
        if word in counter:
            count = counter[word]
        words_with_frequencies[word] = count
    return Counter(words_with_frequencies)



if __name__ == '__main__':
    # word_list = create_word_list()
    # with open('words.txt', 'w') as f:
    #     f.write('\n'.join(word_list))
    words_counts = get_all_words_with_count_frequencies()
    words_count_filepath = os.path.join('hack_wordle_ui', 'public', 'words_counts.txt')
    with open(words_count_filepath, 'w') as f:
        f.write('')
    with open(words_count_filepath, 'a') as f:
        for word, count in words_counts.most_common():
            f.write(f'{word} {count}\n')
