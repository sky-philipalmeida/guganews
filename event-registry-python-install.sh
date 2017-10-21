#!/usr/bin/bash
python get-pip.py --user
cd event-registry-python
export PYTHONPATH=~/.local/lib/python2.7/site-packages/
python setup.py install --prefix=~/.local
