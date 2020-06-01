const crypto = require('crypto')
const moment = require('moment')
const connection = require('../database/connection')

module.exports = {
    async index(req, res) {

        const dados = await connection('race')
            .select("*")

        res.json(dados)
    },

    async get(req, res) {
        const id = req.params.id;

        const dados = await connection('race')
            .select("*")
            .where("id", id)

        res.json(dados)
    },

    async cadastrar(req, res) {

        const stage_id = req.header('idStage');
        const runner_id = req.header('idRunner');

        var { km } = req.body


        //Verifica se o id da etapa existe
        const stage = await connection('stages')
            .select("*")
            .where("id", stage_id)
            .first()

        if (stage == undefined)
            return res.status(401).json({
                error: "Stage not exist"
            })

        //Verifica se o id do corredor existe
        const runner = await connection('runners')
            .select("*")
            .where("id", runner_id)
            .first()

        if (runner == undefined)
            return res.status(401).json({
                error: "Runner not exist"
            })

        //Verifica se o km da etapa existe
        let mileage = await connection('mileage')
            .select("distance")
            .where("stage_id", stage_id)

        mileage = JSON.parse(JSON.stringify(mileage))

        let flag = true
        for (let index = 0; index < mileage.length; index++) {
            const element = mileage[index].distance;
            if (element == km) {
                flag = false
            }
        }
        if (flag)
            return res.status(401).json({
                error: "Mileage not exist"
            })

        //Verificar se o corredor já esta cadastrado na etapa
        let race = await connection('race')
            .select("*")
            .where({ stage_id, runner_id })
            .first()

        if (race != undefined)
            return res.status(401).json({
                error: "Runner already exist on stage"
            })

        //Insere no banco
        const [id] = await connection('race').insert({
            stage_id,
            runner_id,
            km,
        })


        res.json({
            id,
            stage_id,
            runner_id,
            km
        })
    },

    async qualifica(req, res) {

        const stage_id = req.header('idStage');
        const runner_id = req.header('idRunner');
        const { number } = req.body

        //Verifica se o id da etapa existe
        const stage = await connection('stages')
            .select("*")
            .where("id", stage_id)
            .first()

        if (stage == undefined)
            return res.status(401).json({
                error: "Stage not exist"
            })

        //Verifica se o id do corredor existe
        const runner = await connection('runners')
            .select("*")
            .where("id", runner_id)
            .first()

        if (runner == undefined)
            return res.status(401).json({
                error: "Runner not exist"
            })

        //Verifica se o numero já esta sendo usado
        const numero = await connection('race')
            .select("number")
            .where({
                stage_id,
                number
            })
            .first()

        if (numero != undefined)
            return res.status(401).json({
                error: "Number already used"
            })

        //Verificar se o corredor já esta cadastrado na etapa
        let race = await connection('race')
            .select("*")
            .where({ stage_id, runner_id })
            .first()

        race = JSON.parse(JSON.stringify(race))

        if (race.number != null)
            return res.status(401).json({
                error: "Runner already have a number on stage"
            })


        //Atualiza no banco
        let corrida = await connection('race')
            .where({
                runner_id, stage_id
            })
            .update({
                number, isQualify: true
            })

        res.json({
            corrida
        })
    },

    async desqualifica(req, res) {

        const stage_id = req.header('idStage');
        const runner_id = req.header('idRunner');

        //Verifica se o id da etapa existe
        const stage = await connection('stages')
            .select("*")
            .where("id", stage_id)
            .first()

        if (stage == undefined)
            return res.status(401).json({
                error: "Stage not exist"
            })

        //Verifica se o id do corredor existe
        const runner = await connection('runners')
            .select("*")
            .where("id", runner_id)
            .first()

        if (runner == undefined)
            return res.status(401).json({
                error: "Runner not exist"
            })

        //Atualiza no banco
        let corrida = await connection('race')
            .where({
                runner_id, stage_id
            })
            .update({
                number: null, isQualify: false
            })

        res.json({
            corrida
        })

    },

    async chegada(req, res) {

        const stage_id = req.header('idStage');
        const number = req.params.number

        //Verifica se o id da etapa existe
        const race = await connection('race')
            .select("*")
            .where({ stage_id, number })
            .first()

        //Verifica se numero do corredor esta cadastrado na etapa 
        if (race == undefined)
            return res.status(401).json({
                error: "Number does not exist on stage"
            })

        //Verifica se o corredor esta qualificado para correr
        if (race.isQualify == false)
            return res.status(401).json({
                error: "Runner is not qualify"
            })

        let now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

        //Atualiza no banco
        await connection('race')
            .where({
                id: race.id
            })
            .update({
                totaltime: now
            })

        race.totaltime = now
        res.json(race)

    }

};