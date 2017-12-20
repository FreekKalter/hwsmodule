all: run

clean:
	rm -rf venv && rm -rf *.egg-info && rm -rf dist && rm -rf *.log*

venv:
	virtualenv --python=python3 venv && venv/bin/python setup.py develop

run: venv
	FLASK_APP=hwsmodule HWSMODULE_SETTINGS=../settings.cfg venv/bin/flask run -h 0.0.0.0 -p 4000 --reload

test: venv
	HWSMODULE_SETTINGS=../settings.cfg venv/bin/python -m unittest discover -s tests

sdist: venv test
	venv/bin/python setup.py sdist
