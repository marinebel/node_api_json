import { createConnection } from 'typeorm';
import { Category } from './models/Category';
import { Todo } from './models/Todo';
import { User } from './models/User';


class DatabasConnector{
    static async initDatabase(){
        try{
            const connexion = createConnection({
                type:'mysql',
                username:'root',
                password:'test',
                host:'localhost',
                port: 3306,
                database: 'tpk_api',
                synchronize:true,
                entities: [User, Todo, Category]
            });
            return connexion;
        } catch(error){
            return false;
        }
    }
}

export {DatabasConnector};