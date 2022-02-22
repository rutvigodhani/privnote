const db = require('../config/db')

class links{
    constructor(note, destroyWhen, pwd, hashValue){
        this.note = note;
        this.destroyWhen = destroyWhen;
        this.pwd = pwd;
        this.hashValue = hashValue;
    }
    async save(){
        let sql = `insert into temp(note, destroyWhen, pwd, hashValue) values ('${this.note}','${this.destroyWhen}','${this.pwd}','${this.hashValue}');`;
        const [newPost,_] = await db.execute(sql);
        return newPost;
    }
    static async findAll(){
        let sql = `select * from temp`;
        const [findAll,] = await db.execute(sql);
        return findAll;
    }
    static async byId(id){
        let sql = `select * from temp where hashValue='${id}'`;
        console.log(sql);
        const [byId,] = await db.execute(sql);
        return byId;
    }
}

module.exports = links;
