all: run

clean:
	rm -rf venv && rm -rf *.egg-info && rm -rf dist && rm -rf *.log*

venv:
	python3 -m venv `pwd`/venv && venv/bin/pip3 install -r requirements.txt

run: venv
	python run.py

test: venv
	HWSMODULE_SETTINGS=../settings.cfg venv/bin/python -m unittest discover -s tests

sdist: venv test
	venv/bin/python setup.py sdist
