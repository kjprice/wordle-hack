#!/bin/bash
cd "$(dirname "$0")"

source ../misc/setup_shell.sh

cd ../..

python -m python.wordle_hack "$@"