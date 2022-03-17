NEW_MODEL_NAME=teste
NEW_MODEL_ATTRIBUTES=id:integer,test:string
NEW_SEED_NAME=teste-seed

up:
	docker-compose up

up-silent:
	docker-compose up -d

down:
	docker-compose down

db-shell:
	mysql -h127.0.0.1 -P3308 -uroot -proot -Ddb_users

db-migrate:
	docker exec -it service_users npx sequelize db:migrate

db-model-create:
	npx sequelize model:create --name ${NEW_MODEL_NAME} --attributes ${NEW_MODEL_ATTRIBUTES}

db-rollback:
	docker exec -it service_users npx sequelize db:migrate:undo:all

db-seed:
	docker exec -it service_users npx sequelize-cli db:seed:all

db-seed-rollback:
	docker exec -it service_users npx sequelize db:seed:undo:all

db-seed-create:
	npx sequelize seed:generate --name ${NEW_SEED_NAME}

swagger:
	node swagger.js