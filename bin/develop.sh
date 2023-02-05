#!/bin/bash
cd "$(dirname "$0")"
cd ..

# nodemon -w python -e py -x './bin/run/wordle_hack.sh par_y -a t -w l'
nodemon -w python -e py -x './bin/run/create_word_list.sh'