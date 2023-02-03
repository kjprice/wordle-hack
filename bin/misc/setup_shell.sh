#!/bin/bash

function setup_python() {
  if test -f "/Users/kjprice/anaconda3/envs/python3.6/bin/python3.6"; then
    alias python=/Users/kjprice/anaconda3/envs/python3.6/bin/python3.6
  elif test -f "/home/kjprice/miniconda3/envs/directml/bin/python"; then
    alias python=/home/kjprice/miniconda3/envs/directml/bin/python
  elif [ -f /usr/bin/python3 ]; then
      alias python=/usr/bin/python3
  fi
}

setup_python