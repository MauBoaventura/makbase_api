const express = require('express')
const routes = express.Router()

// const RunnerController = require('./controllers/RunnerController')
// const StageController = require('./controllers/StageController')
// const RaceController = require('./controllers/RaceController')
// const MileageController = require('./controllers/MileageController')

// // Corredores
// routes.get('/corredor', RunnerController.index)
// routes.get('/corredor/:id', RunnerController.get)
// routes.post('/corredor', RunnerController.create)
// routes.put('/corredor/:id', RunnerController.update)
// routes.delete('/corredor/:id', RunnerController.delete)

// // Etapas
// routes.get('/etapa', StageController.index)
// routes.get('/etapa/:id', StageController.get)
// routes.post('/etapa', StageController.create)
// routes.put('/etapa/:id', StageController.update)
// routes.delete('/etapa/:id', StageController.delete)

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