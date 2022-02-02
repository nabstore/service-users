# Backend da Nabstore
#### Aluno: Nabson Paiva
Este diretório possui o backend (API Rest) da loja online desenvolvida com NodeJS.

## Para executar pela primeira vez
1. **Execução da API e do banco**:
    ```bash
    make up
    ```
    ou
    ```bash
    docker-compose up
    ```

2. **Executar migrations**:
    ```bash
    make db-migrate
    ```
    ou
    ```bash
    docker exec -it web_shop npx sequelize db:migrate
    ```

3. **Inserir seeds**:
    ```bash
    make db-seed-insert
    ```
    ou
    ```bash
    docker exec -it web_shop npx sequelize-cli db:seed:all
    ```


## Comandos do Banco de Dados

1. Abrir um terminal interativo:
    ```bash
    make db-shell
    ```

2. Criar um novo modelo:
    ```bash
    make db-model-create NEW_MODEL_NAME=<model_name> NEW_MODEL_ATTRIBUTES=<att1=type,att2=type...>
    ```

3. Executar migrações:
    ```bash
    make db-migrate
    ```

4. Criar um novo seed:
    ```bash
    make db-seed-create NEW_SEED_NAME=<seed_name>
    ```

4. Inserir no banco todos os seeds:
    ```bash
    make db-seed-insert
    ```
