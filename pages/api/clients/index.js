import { pool } from "../../../config/db"

export default async function handler(req, res) {
    
    switch(req.method) {
        case 'GET':
            return await getClients(req, res);
        case 'POST': 
            return await saveClient(req, res);

            

    };
};

const getClients = async (req, res) => {
    const [result] = await pool.query('SELECT id_cliente, fullname, address, ip, tel, email from clientes_marilo_2023')
    return res.status(200).json(result)
}

const saveClient = async (req, res) => {
    const {fullname, address, ip, tel, email} = req.body

    const [result] = await pool.query('INSERT INTO clientes_marilo_2023 SET ?',{
        fullname,
        address,
        ip,
        tel,
        email,
    });
    return res
        .status(200)
        .json({ fullname, address, ip, tel, email, id: result.insertId })
}