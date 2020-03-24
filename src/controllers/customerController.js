const pool = require('../config/pool-factory');

const getCustomers = async (req, res) => {
    pool.query('SELECT * FROM customer ORDER BY id ASC', (error, result) => {
        console.log(result)
        if (error) {
            res.status(400).send("errorGetCustomers");
        }
        res.status(200).json(result.rows)
    })
};

const getCustomerById = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, result) => {
        console.log(result)
        if (error) {
            res.status(400).send("errorGetCustomerById");
        }
        res.status(200).json(result.rows)
    })
};

const createCustomer = async (req, res) => {
    const { name, cli, cpf, email, phone1, phone2 } = req.body;
    pool.query('INSERT INTO customer (name, cli, cpf, email, phone1, phone2) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, cli, cpf, email, phone1, phone2], (error, results) => {
        if (error) {
        res.status(400).send("Erro ao criar Cliente");
        }
        console.log(results)
        res.status(201).send(results.rows)
      })
};

const updateCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, cli, cpf, email, phone1, phone2 } = req.body;

    if (id > 0) {
        pool.query(`UPDATE customer SET 
                name = $1,
                cli = $2,
                cpf = $3,
                email = $4,
                phone1 = $5,
                phone2 = $6
                    WHERE id = $7 RETURNING *`, [
            name,   // 1
            cli,    // 2
            cpf,    // 3
            email,  // 4
            phone1, // 5
            phone2, // 6
            id      // 7
        ], (error, results) => {
            if (error) {
            //   throw error
            res.status(400).send("Erro ao atualizar Cliente");
            }
            console.log(results)
            // res.send(results.rows)
            res.status(200).send(results.rows)
          })
    } else {
        res.status(400).send("Erro ao identificar cliente para atualizar");
    }
    
};

const deleteCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM customer WHERE id = $1 RETURNING *', [id], (error, result) => {
        console.log(result)
        if (error) {
            // throw error;
            res.status(400).send("errorDeleteCustomerById");
        }

        if ( result.rowCount > 0 ) {
            res.status(200).send(`${id}`)
        } else {
            res.status(400).send("errorDeleteCustomerByIdNotFound");
        }
    })
};

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};