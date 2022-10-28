const {headers} = require('../constants');

class MessageController {
    static async sendMessage(req, res) {
        try {
            res.writeHead(200, headers);
            const data = `data: ${req.body.message}\n\n`;
            res.write(data);

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}
module.exports = {MessageController}