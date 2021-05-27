import { createConnection } from 'typeorm';
import { Category } from './models/Category';
import { Todo } from './models/Todo';
import { User } from './models/User';

class DatabaseConnector{
    static async initDatabase(){
        try{
            const connection = createConnection({
                type:'mysql',
                username:'root',
                password:'test',
                host:'localhost',
                name:'default',
                port: 3306,
                database: 'todo_typeorm',
                synchronize:true,
                entities: [User, Todo, Category]
            });
            return connection;
        } catch(error){
            return false;
        }
    }
}

export {DatabaseConnector};