const db = require('../config/db')

class links{
    constructor(note, destroyWhen, pwd, hashValue){
        this.note = note;
        this.destroyWhen = destroyWhen;
        this.pwd = pwd;
        this.hashValue = hashValue;
    }
    async save(){
        let sql = `insert into temp(note, destroyWhen, pwd, hashValue, createdAt) values ('${this.note}','${this.destroyWhen}','${this.pwd}','${this.hashValue}', NOW());`;
        const [newPost,_] = await db.query(sql);
        return newPost;
    }
    static async findAll(){
        let sql = `select * from temp`;
        const [findAll,] = await db.query(sql);
        return findAll;
    }
    static async byId(id){
        let sql = `select * from temp where hashValue='${id}'`;
        const [byId,] = await db.query(sql);
        return byId;
    }
    static async deletebyId(id){
        let sql = `delete from temp where hashValue='${id}'`;
        const [deletebyId,] = await db.query(sql);
        return deletebyId;
    }
}

module.exports = links;
