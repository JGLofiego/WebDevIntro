const mysql = require('../../database')

exports.getAllUsers = (req, res) => {
    mysql.pool.getConnection((error, conn) => {
        if (error) {
            console.error(error)
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM users',
            (error, response) => {
                if (error) {
                    console.error(error)
                    return res.status(500).send({ error: error })
                }
                res.status(200).send({
                    message: 'Exibindo todos os dados',
                    response: response
                })
            }
        )

    })
}

exports.getOneUser = (req, res) => {
    mysql.pool.getConnection((error, conn) => {
        if (error) {
            console.log(error)
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM users WHERE id = ?', [req.params.id],
            (error, response) => {
                if (error) {
                    console.error(error)
                    return res.status(500).send({ error: error })
                }
                res.status(200).send({
                    message: 'Exibindo usuário',
                    response: response
                })
            }
        )
    })
}

exports.createUser = (req, res) => {
    mysql.pool.getConnection((error, conn) => {
        if (error) {
            console.error(error)
            return res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO users (name,breads) VALUES (?, ?)', [req.body.name, req.body.breads],

            (error, response) => {
                conn.release()
                if (error) {
                    console.error(error)
                    return res.status(500).send({ error: error })
                }
                res.status(201).send({
                    message: 'Usuário cadastrado com sucesso',
                    response: response
                })
            }
        )
    })
}

exports.deleteUser = (req, res) => {
    mysql.pool.getConnection((error, conn) => {
        if (error) {
            console.error(error)
            return res.status(500).send({ error: error })
        }
        conn.query(
            'DELETE FROM users WHERE id = ?', [req.params.id],
            (error) => {
                if (error) {
                    console.error(error)
                    return res.status(500).send({ error: error })
                }
                res.status(200).send({
                    message: 'Usuário deletado com sucesso'
                })
            }
        )
    })
}