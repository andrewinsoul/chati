const {headers} = require('../constants');

class UsersController {
    static async registerUser(req, res) {
        try {
            const {username} = req.query;
            res.writeHead(200, headers);
            const data = `data: Welcome back, ${username} 2 CHATI\n\n`;
            // do your database insert here
            res.write(data);

            req.on('close', () => {
                console.log(`${username} Connection closed`);
                clients = clients.filter(client => client.id !== clientId);
            });

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}
module.exports = { UsersController }