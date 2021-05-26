import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Todo } from './Todo';

@Entity()
class Category extends BaseModel{
    @Column('varchar')
    public title!:string;

    @ManyToMany(() => Todo, (todo) => todo.category)
    public todos!:Todo[];
}

export{Category};