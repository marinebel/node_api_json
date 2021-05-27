import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../../models/User';


class UserController {

    static create = async(req:Request, res:Response) => {
        const userRepository = getRepository(User);
        const newUser = userRepository.create({
            email:req.body.email,
            password:req.body.password
        });

        await userRepository.save(newUser);
        return res.json({users:await userRepository.find({})});
    }

    static update = async(req:Request, res:Response) => {
        const userRepository = getRepository(User);
        const {id} = req.params;
        const userId = await userRepository.findOne(id);
        if(userId) {
            userId.email = req.body.email;
            userId.password = req.body.password;
            return res.json(await userRepository.save(userId));
        }
    }
    static delete = async(req:Request, res:Response) => {
        const userRepository = getRepository(User);
        const {id} = req.params;
        const user = await userRepository.findOne(id);

        if (user) {
            return res.json(await userRepository.softRemove(user));
        }
    }
    static findById = async(req:Request, res:Response) => {
        const user = getRepository(User);
        const {id} = req.params;
        return res.json(await user.findOne(id));
    }
    static findAll= async (req:Request, res:Response) => {
        const userRepository = getRepository(User);
        return res.json({users:await userRepository.find({})});
    }
}

export {UserController};