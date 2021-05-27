import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Todo } from './Todo';

@Entity()
class User extends BaseModel{
    @Column({nullable:false, unique:true})
    public email!:string;
    
    @Column({nullable:false, unique:true})
    public password!:string;
    
    @OneToMany(() => Todo, (todo) => todo.user)
    public todos?: Todo[];
}

export{User};