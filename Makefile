
all:
	# git add .
	# git commit -m "checking for new updates to pull them"
	# git pull
	docker-compose -f docker-compose.yaml up --build -d
migrate: 
	./src/backend/backend-api/ npx prisma migrate dev 

down:
	docker-compose -f docker-compose.yaml down  --remove-orphans

clean:
	docker system prune -a

fclean:

re:

.PHONY: all clean fclean re