import { plugin } from '@typegoose/typegoose';
import passportLocal from 'passport-local-mongoose';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Todo } from './Todo';
@plugin(passportLocal, {
    usernameField:'email'
})
@Entity()
class User extends BaseModel{
    @Column('varchar', {nullable:false, unique:true})
    public email!:string;
    @OneToMany(() => Todo, (todo) => todo.user)
    public todos?: Todo[];
}

export{User};