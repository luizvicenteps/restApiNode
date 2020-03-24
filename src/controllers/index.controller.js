const pool = require('../config/pool-factory');

const getUsers = async (req, res) => {
    // const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    // res.status(200).json(response.rows);
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        console.log(result)
        if (error) {
            // throw error;
            res.status(404).send("Oh uh, something went wrong");
        }
        res.status(200).json(result.rows)
    })
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};
const createCustomer = async (req, res) => {
    const { name, email } = req.body;
    // const response = await pool.query('INSERT INTO customer ( name, email, cli, cpf, obs ) VALUES ($1 , $2);', [name, email]);
    // res.json({
    //     message: 'User Added successfully',
    //     body: {
    //         user: {name, email}
    //     }
    // })

    pool.query('INSERT INTO customer (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
        //   throw error
        res.status(402).send("Erro ao criar Cliente");
        }
        console.log(results)
        // res.send(results.rows)
        res.status(201).send(results.rows)
      })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createCustomer,
};