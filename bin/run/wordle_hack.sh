#!/bin/bash
cd "$(dirname "$0")"

source ../misc/setup_shell.sh

echo kj

cd ../..

python -m python.wordle_hack "$@"