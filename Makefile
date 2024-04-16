create:
	docker compose up -d --build

run:
	docker compose exec js-games npm run start
