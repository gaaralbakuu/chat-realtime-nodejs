const mysql = require('mysql2/promise');

class Database {

    constructor() {
        this.pool = mysql.createPool({
            host: '15.235.193.133',
            user: 'chat-realtime',
            password: 'DxbATZpMHsiJnwAG',
            database: 'chat-realtime',
        });
    }

    async execute(query, params) {
        const connection = await this.pool.getConnection();
        try {
            const [results, fields] = await connection.execute(query, params);
            return results;
        } finally {
            connection.release();
        }
    }

    async close() {
        await this.pool.end();
    }

}

module.exports = Database;