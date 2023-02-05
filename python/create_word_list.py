from typing import List

# conda install -c conda-forge pattern
from pattern.en import verbs

from nltk.corpus import wordnet, words
from nltk import pos_tag
import pandas as pd

def word_exists(word: str) -> bool:
    return len(wordnet.synsets(word)) > 0

def get_all_words_cleaned() -> List[str]:
    all_words = words.words()

    return [word.lower().strip() for word in all_words]

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
    all_words = get_all_words_cleaned() + get_all_verbs()

    all_five_char_words = [word for word in all_words if len(word) == 5]

    # Remove duplicates
    unique_five_char_words = sorted(list(set(all_five_char_words)))

    return unique_five_char_words

if __name__ == '__main__':
    word_list = create_word_list()
    with open('words.txt', 'w') as f:
        f.write('\n'.join(word_list))
