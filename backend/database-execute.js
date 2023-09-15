class DatabaseExecute {
    constructor({ db }) {
        this.db = db;
    }

    async execute(query, params) {
        return await this.db.execute(query, params);
    }
}

module.exports = DatabaseExecute;