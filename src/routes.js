const express = require('express')
const routes = express.Router()
const passport = require('passport')

const LoginController = require('./controllers/LoginController')
const AutenticaController = require('./controllers/AutenticaController')
const util = require('./util/authentication')

const ClientController = require('./controllers/ClientController')
const SellerController = require('./controllers/SellerController')
const StoreController = require('./controllers/StoreController')
const ProductController = require('./controllers/ProductController')

//Login email
routes.get('/', (req, res) => {
    res.send("<h1>API MARKBASE ONLINE</h1>")
})
routes.post('/loginCliente', LoginController.loginCliente)
routes.post('/loginVendedor', LoginController.loginVendedor)
routes.get('/logoutVendedor', util.verificacaoJWT, AutenticaController.logout)

// Autenticacao Google
routes.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }))

routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/good');
    })

routes.get('/fail', AutenticaController.fail_login)
routes.get('/good', AutenticaController.isLoggedIn, AutenticaController.success_login)
routes.get('/logout', AutenticaController.logout)

// Clientes
routes.get('/cliente', ClientController.index)
routes.get('/cliente/:cpf', ClientController.get)
routes.post('/cliente', ClientController.post)
routes.put('/cliente/:cpf', util.verificacaoJWT_isCliente, ClientController.update)
routes.delete('/cliente/:cpf', util.verificacaoJWT_isCliente, ClientController.delete)

// Vendedores
routes.get('/vendedor', SellerController.index)
routes.get('/vendedor/:cpf_cnpj', SellerController.get)
routes.post('/vendedor', SellerController.post)
routes.put('/vendedor/:cpf_cnpj', util.verificacaoJWT_isVendedor, SellerController.update)
routes.delete('/vendedor/:cpf_cnpj', util.verificacaoJWT_isVendedor, SellerController.delete)

// Lojas
routes.get('/loja', StoreController.index)
routes.get('/loja/:id', StoreController.get)
routes.post('/loja', util.verificacaoJWT_isVendedor, StoreController.post)
routes.put('/loja/:id', util.verificacaoJWT_isVendedor, StoreController.update)
routes.delete('/loja/:id', util.verificacaoJWT_isVendedor, StoreController.delete)

// Produtos Produto
routes.get('/produto', ProductController.index)
routes.get('/produto/:id', ProductController.get)
routes.post('/produto', util.verificacaoJWT_isVendedor, ProductController.post)
routes.put('/produto/:id', util.verificacaoJWT_isVendedor, ProductController.update)
routes.delete('/produto/:id', util.verificacaoJWT_isVendedor, ProductController.delete)

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