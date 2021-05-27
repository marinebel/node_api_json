import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../../models/Category';

class CategoryController {
    
    static findAll= async (req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
       return res.json({categories:await categoryRepository.find()});
    }

    static create = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const newcategory = categoryRepository.create({
            title:req.body.title
        });

        await categoryRepository.save(newcategory);
        return res.json({categories:await categoryRepository.find({})});
    }
    static update = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const {id} = req.params;
        const categoryId = await categoryRepository.findOne(id);
        if(categoryId) {
            categoryId.title = req.body.email;
            return res.json(await categoryRepository.save(categoryId));
        }
    }
    static delete = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const {id} = req.params;
        const category = await categoryRepository.findOne(id);

        if (category) {
            return res.json(await categoryRepository.softRemove(category));
        }
    }
    static findById = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const {id} = req.params;
        return res.json(await categoryRepository.findOne(id));
    }
}

export {CategoryController};