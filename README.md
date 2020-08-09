# MARKBASE API

Olá! Esta é uma API REST que realiza o gerenciamento de lojas online   

Contém endpoints para cadastro de usuarios e vendedores além de outras funcionalidades da aplicação como cadastro de produtos e a compras.

É uma API feita com Javascript (Node.js), trabalha com banco de dados relacional (MySQL), usa como metodos de Autenticacao **OAUTH2** (Google e Facebook) e como ferramenta de autorização usa JSON WEB Tokem (JWT) 


**POSTMAN: https://documenter.getpostman.com/view/10582029/T1Dv6ZEf**

**Heroku: https://markbase.herokuapp.com/**

## Endpoints:

### Login

#### Cliente (POST)

- Realiza uma pesquisa na base de dados de clientes e retorna um JWT e os dados do cliente 

#### Vendedor (POST)

- Realiza uma pesquisa na base de dados de vendedor e retorna um JWT e os dados do vendedor 

### Cliente

#### Cadastro (POST)

- Cadastra um cliente passando todos os dados:

name, age, gender, email, whatsapp, city, uf.

#### Listar um (GET)

- Recupera do banco de dados as informações de um cliente

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos cliente

#### Apagar (DELETE) - Necessário estar autenticado e com um Token JWT

- Apaga do banco de dados as informações de um cliente

#### Modificar (PUT) - Necessário estar autenticado e com um Token JWT

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

#### Apagar (DELETE) - Necessário estar autenticado e com um Token JWT

- Apaga do banco de dados as informações de um vendedor

#### Modificar (PUT) - Necessário estar autenticado e com um Token JWT

- Altera do banco de dados as informações de um vendedor

	cpf_cnpj, name, lastname, email, age, password

### Loja

#### Cadastro (POST) - Necessário estar autenticado e com um Token JWT

- Cadastra uma loja passando todos os dados:

	fantasy_name, legal_name, state_registration, cep, logradouro, number, complement


#### Listar um (GET)

- Recupera do banco de dados as informações de uma loja

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos vendedor

#### Apagar (DELETE) - Necessário estar autenticado e com um Token JWT

- Apaga do banco de dados as informações de uma loja

#### Modificar (PUT) - Necessário estar autenticado e com um Token JWT

- Altera do banco de dados as informações de uma loja

	fantasy_name, legal_name, state_registration, cep, logradouro, number, complement


### Produto

#### Cadastro (POST) - Necessário estar autenticado e com um Token JWT

- Cadastra um produto passando todos os dados:
	store_id, status, name, sku, unit_price, unit_price_discount, description, stock, seo_description, seo_name, category_id, collor_id, size_id

#### Listar um (GET)

- Recupera do banco de dados as informações de um produto

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos produto

#### Apagar (DELETE) - Necessário estar autenticado e com um Token JWT

- Apaga do banco de dados um produto setando um novo status

#### Modificar (PUT) - Necessário estar autenticado e com um Token JWT

- Altera do banco de dados as informações de um produto

	store_id, status, name, sku, unit_price, unit_price_discount, description, stock, seo_description, seo_name, category_id, collor_id, size_id

