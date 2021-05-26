import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseModel } from './base.model';
import { Category } from './Category';
import { User } from './User';

@Entity()
class Todo extends BaseModel {
    @Column('varchar', {nullable:false, unique:true})
    public title!:string;
    @Column('varchar')
    public description?:string;
    @ManyToMany(() => Category, (category) => category.todos)
    @JoinTable({
        name:'todos_categories'
    })
    public category!:Category
    @ManyToOne(() => User, (user) => user.todos)
    public user!:User;
}

export{Todo};