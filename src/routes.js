const express = require('express')
const routes = express.Router()

const SellerController = require('./controllers/SellerController')
const ClientController = require('./controllers/ClientController')
const ProductController = require('./controllers/ProductController')
// const StageController = require('./controllers/StageController')
// const RaceController = require('./controllers/RaceController')
// const MileageController = require('./controllers/MileageController')

// Vendedores
routes.get('/vendedores', SellerController.index)
routes.get('/vendedores/:cpf_cnpj', SellerController.get)
routes.post('/vendedores', SellerController.post)
routes.put('/vendedores/:cpf_cnpj', SellerController.update)
routes.delete('/vendedores/:cpf_cnpj', SellerController.delete)

// Clientes
routes.get('/cliente', ClientController.index)
routes.get('/cliente/:cpf_cnpj', ClientController.get)
routes.post('/cliente', ClientController.post)
routes.put('/cliente/:cpf_cnpj', ClientController.update)
routes.delete('/cliente/:cpf_cnpj', ClientController.delete)

// Produtos Cliente
// routes.get('/produto', ProductController.index)
routes.get('/produto/:id', ProductController.get)
routes.post('/produto', ProductController.post)
routes.put('/produto/:id', ProductController.update)
routes.delete('/produto/:id', ProductController.delete)

// // Configurações
// routes.get('/quilometragem', MileageController.get)
// routes.post('/quilometragem', MileageController.create)
// routes.delete('/quilometragem', MileageController.delete)


// // Tempo
// routes.get('/time/:id', StageController.time)
// routes.post('/inicio/:id', StageController.inicio)
// routes.post('/zerar/:id', StageController.zerar)

// // Corrida
// /*
//     Header: idStage, idRunner
// */
// routes.get('/corrida/:id', RaceController.get)
// routes.post('/corrida', RaceController.cadastrar)
// // routes.post('/qualifica', RaceController.qualifica)
// // routes.post('/desqualifica/:id', RaceController.qualifica)

// // Relatorios
// // routes.get('/relatorio/geral', OngsController.index)
// // routes.get('/relatorio/competidores', OngsController.index)
// // routes.get('/relatorio/categoria', OngsController.index)

// // routes.get('/profile', ProfileController.index)

module.exports = routes