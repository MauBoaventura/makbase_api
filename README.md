# MARKBASE API

Olá! Esta é uma API REST que realiza o gerenciamento de lojas online   

Contém endpoints para cadastro de usuarios e vendedores além de outras funcionalidades da aplicação como cadastro de produtos e a compras.

É uma API feita com Javascript (Node.js), trabalha com banco de dados relacional (MySQL), usa como metodos de Autenticacao **OAUTH2** (Google e Facebook) e como ferramenta de autorização usa JSON WEB Tokem (JWT) 


**POSTMAN: https://documenter.getpostman.com/view/10582029/T1Dv6ZEf**

**Heroku: https://markbase.herokuapp.com/**

## Endpoints:

### Cliente

#### Cadastro (POST)

- Cadastra um cliente passando todos os dados:

name, age, gender, email, whatsapp, city, uf.

#### Listar um (GET)

- Recupera do banco de dados as informações de um cliente

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos cliente

#### Apagar (DELETE)

- Apaga do banco de dados as informações de um cliente

#### Modificar (PUT)

- Altera do banco de dados as informações de um cliente

	cpf_cnpj, name, lastname, email, age


### Vendedor

#### Cadastro (POST)

- Cadastra um vendedor passando todos os dados:

	cpf_cnpj, name, lastname, email, age, password
    

#### Listar um (GET)

- Recupera do banco de dados as informações de um vendedor

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos vendedor

#### Apagar (DELETE)

- Apaga do banco de dados as informações de um vendedor

#### Modificar (PUT)

- Altera do banco de dados as informações de um vendedor

	cpf_cnpj, name, lastname, email, age, password


### Produto

#### Cadastro (POST)

- Cadastra um produto passando todos os dados:
	store_id, status, name, sku, unit_price, unit_price_discount, description, stock, seo_description, seo_name, category_id, collor_id, size_id

#### Listar um (GET)

- Recupera do banco de dados as informações de um produto

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos produto

#### Apagar (DELETE)

- Apaga do banco de dados um produto setando um novo status

#### Modificar (PUT)

- Altera do banco de dados as informações de um produto

	store_id, status, name, sku, unit_price, unit_price_discount, description, stock, seo_description, seo_name, category_id, collor_id, size_id

### Relatórios

#### Todos clientees (GET)

- Recupera do banco de dados as informações de todos os cliente na corrida para exibição do resultado

#### Todos clientees por quilometragem (GET)

- Recupera do banco de dados as informações de todos os cliente na corrida para exibição do resultado

#### Todos clientees por genero (GET)

- Recupera do banco de dados as informações de todos os cliente na corrida para exibição do resultado


