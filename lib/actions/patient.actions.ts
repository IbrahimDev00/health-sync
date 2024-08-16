import { ID, Query } from "node-appwrite"
import {users} from '../appwrite.config'
import { parseStringify } from "../utils"
import { undefined } from "zod"
//try importing client from config file.

export const createUser = async (user: CreateUserParams) => {
    try{
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            //user.phone,
            //undefined,
            //"[pwd]" {Try Random string generator}

    )
    console.log({newUser})

    return parseStringify(newUser);
    } catch(error:any){
        if (error && error?.code === 409){
            const existingUser = await users.list([
                Query.equal('email', [user.email]),
            ]);

                //Just trying to declare this variable outside the above block to see if that works!!
                // `user.list ()` usually returns object having 1)'total users` and 2) `users` (array)
            const foundUser = existingUser.users ? existingUser.users[0] : null;

            return foundUser;
        }
    }
};
