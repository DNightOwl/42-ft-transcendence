
FOLDER= $(shell basename $(CURDIR))

all:

build:
	docker compose up --build

stop:
	docker compose stop

start:
	docker compose start

clean:
	docker rm transcendence-backend transcendence-frontend postgres
	docker rmi transcendence-backend transcendence-frontend postgres
	docker volume rm $(FOLDER)_backend $(FOLDER)_frontend $(FOLDER)_node_modules_b $(FOLDER)_node_modules_f $(FOLDER)_postgres