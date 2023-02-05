from typing import List

# conda install -c conda-forge pattern
from pattern.en import verbs

from nltk.corpus import words
from nltk import pos_tag
import pandas as pd

def get_all_words_cleaned() -> List[str]:
    all_words = words.words()

    return [word.lower().strip() for word in all_words]

def get_all_verbs() -> List[str]:
    all_verbs = []
    for verb_root in verbs:
        verb_conjugations = [verb.lower().strip() for verb in verbs[verb_root] if verb != '']
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
