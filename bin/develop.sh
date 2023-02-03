#!/bin/bash
cd "$(dirname "$0")"
cd ..

nodemon -w python -e py -x './bin/run/wordle_hack.sh'