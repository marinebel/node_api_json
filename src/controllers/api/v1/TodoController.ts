import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Todo } from '../../../models/Todo';
import { User } from '../../../models/User';


class TodoController {
    
    static findAll= async (req:Request, res:Response) => {
        const model = getRepository(Todo);
        const userModel = getRepository(User);
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user = await userModel.findOne(tokenUserId);
        if(req.query.filterByCategory){
            // return res.json({todos:await TodoController.model.find({user, category:req.query.filterByCategory}).populate('category')});
        }
       return res.json({todos:await model.find({
        //    relations: ['category']
       })
    });
    };

    static create = async(req:Request, res:Response) => {
        // const todo:Todo = new TodoController.model(req.body);
        const model = getRepository(Todo);
        const userModel = getRepository(User);
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user = await userModel.findOne(tokenUserId);
        req.body.user=user;
        const newTodo = model.create({
            title: req.body.title,
            description: req.body.description
        });
        await model.save(newTodo);
        return res.json({todos:await model.find({})});
    }
    static update = async(req:Request, res:Response) => {
        const model = getRepository(Todo);
        const {id} = req.params;
        const todoId = await model.findOne(id);
        if(todoId) {
            todoId.title = req.body.title;
            todoId.description = req.body.description;
            return res.json(await model.save(todoId));
        }
    }
    static delete = async(req:Request, res:Response) => {
        const model = getRepository(Todo);
        const {id} = req.params;
        const todoId = await model.findOne(id);
        if(todoId) {
            return res.json(await model.softRemove(todoId));
        }
    }
    static findById = async(req:Request, res:Response) => {
        const model = getRepository(Todo);
        const {id} = req.params;
        return res.json(await model.findOne(id));
    }
}

export {TodoController};