# MARKBASE API

Olá! Esta é uma API REST que realiza o gerenciamento de lojas online   

Contém endpoints para cadastro de usuarios e vendedores além de outras funcionalidades da aplicação como cadastro de produtos e a compras.

É uma API feita com Javascript (Node.js), trabalha com banco de dados relacional (MySQL), usa como metodos de Autenticacao **OAUTH2** (Google e Facebook) e como ferramenta de autorização usa JSON WEB Tokem (JWT) 


**POSTMAN: https://documenter.getpostman.com/view/10582029/T1Dv6ZEf**

**Heroku: https://markbase.herokuapp.com/**

## Endpoints:

### Runner

#### Cadastro (POST)

- Cadastra um corredor passando todos os dados:

name, age, gender, email, whatsapp, city, uf.


#### Listar um (GET)

- Recupera do banco de dados as informações de um corredor

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos corredor

#### Apagar (DELETE)

- Apaga do banco de dados as informações de um corredor

#### Modificar (PUT)

- Altera do banco de dados as informações de um corredor

name, age, gender, email, whatsapp, city, uf.


### Stages

#### Cadastro (POST)

- Cadastra uma etapa passando todos os dados:

name, city, uf


#### Listar um (GET)

- Recupera do banco de dados as informações de uma etapa

#### Listar todos (GET)

- Recupera do banco de dados as informações de todos corredor

#### Apagar (DELETE)

- Apaga do banco de dados as informações de uma etapa

#### Modificar (PUT)

- Altera do banco de dados as informações de uma etapa

name, city, uf


### Race

#### Cadastro (POST)

- Informa qual a distancia o corredor vai competir

km

#### Lista todos (GET)

- Recupera do banco de dados as informações de todos os corredor na corrida

#### Lista um (GET)

- Recupera do banco de dados as informações de um corredor na corrida

#### Qualifica (PUT)

- Qualifica o corredor na etapa e lhe atribui um numero

#### Desqualifica (PUT)

- Desqualifica o corredor na etapa 

#### Chegada (PUT)

- Coloca o tempo do corredor na etapa 


### Relatórios

#### Todos corredores (GET)

- Recupera do banco de dados as informações de todos os corredor na corrida para exibição do resultado

#### Todos corredores por quilometragem (GET)

- Recupera do banco de dados as informações de todos os corredor na corrida para exibição do resultado

#### Todos corredores por genero (GET)

- Recupera do banco de dados as informações de todos os corredor na corrida para exibição do resultado


