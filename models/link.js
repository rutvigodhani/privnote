const db = require('../config/db')

class links{
    constructor(note, destroyWhen, pwd, hashValue){
        this.note = note;
        this.destroyWhen = destroyWhen;
        this.pwd = pwd;
        this.hashValue = hashValue;
    }
    save(){
        let sql = `insert into privnote(note, destroyWhen, pwd, hashValue, createdAt) values ('${this.note}','${this.destroyWhen}','${this.pwd}','${this.hashValue}',NOW())`;
        db.query(sql,(err, res) => {
            if (err) throw err;
            });
    }
    static byId(id){
        let sql = `select * from privnote where hashValue='${id}'`;
        return sql;
    }
    static deletebyId(id){
        let sql = `delete from privnote where hashValue='${id}'`;
        return sql;
    }
}

module.exports = links;
