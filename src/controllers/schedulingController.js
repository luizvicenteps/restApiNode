const pool = require('../config/pool-factory');

const getSchedulings = async (req, res) => {
    pool.query('SELECT * FROM scheduling ORDER BY id ASC', (error, result) => {
        console.log(result)
        if (error) {
            res.status(400).send("errorGetSchedulings");
        }
        res.status(200).json(result.rows)
    })
};

const getSchedulingById = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM scheduling WHERE id = $1', [id], (error, result) => {
        console.log(result)
        if (error) {
            res.status(400).send("errorGetSchedulingById");
        }
        res.status(200).json(result.rows)
    })
};

const createScheduling = async (req, res) => {
    const { name, idCustomer, idStore, idSlot, schedulingStart, strSchedulingStart } = req.body;
    pool.query('INSERT INTO scheduling (name, idCustomer, idStore, idSlot, schedulingStart, strSchedulingStart ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[
        name,
        idCustomer,
        idStore,
        idSlot,
        schedulingStart,
        strSchedulingStart
    ], (error, results) => {
        if (error) {
        res.status(400).send("Erro ao criar Agendamento");
        }
        console.log(results)
        res.status(201).send(results.rows)
      })
};

const updateScheduling = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, idCustomer, idStore, idSlot, schedulingStart, strSchedulingStart } = req.body;

    if (id > 0) {
        pool.query(`UPDATE scheduling SET 
                name = $1,
                idCustomer = $2,
                idStore = $3,
                idSlot = $4,
                schedulingstart = $5,
                strschedulingstart = $6
                WHERE id = $7 RETURNING *`, [
            name,
            idCustomer,
            idStore,
            idSlot,
            schedulingStart,
            strSchedulingStart,
            id
        ], (error, results) => {
            if (error) {
            //   throw error
            res.status(400).send("Erro ao atualizar Agendamento");
            }
            console.log(results)
            // res.send(results.rows)
            res.status(200).send(results.rows)
          })
    } else {
        res.status(400).send("Erro ao identificar cliente para atualizar");
    }
    
};

const deleteScheduling = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM scheduling WHERE id = $1 RETURNING *', [id], (error, result) => {
        console.log(result)
        if (error) {
            // throw error;
            res.status(400).send("errorDeleteSchedulingById");
        }

        if ( result.rowCount > 0 ) {
            res.status(200).send(`${id}`)
        } else {
            res.status(400).send("errorDeleteSchedulingByIdNotFound");
        }
    })
};

module.exports = {
    getSchedulings,
    getSchedulingById,
    createScheduling,
    updateScheduling,
    deleteScheduling,
};