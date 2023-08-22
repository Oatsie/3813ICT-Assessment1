import { Observable } from "rxjs";
import { User } from "../entities/User";

export interface IUserRepository{
    getAllUsers(): Observable<User[]>;
    getUserById(id: number): Observable<User> | Observable<undefined>;
    getUserByLogin(username: string, password: string): Observable<User> | Observable<undefined>;
    createUser(user: User): Observable<Error> | Observable<boolean>;
    updateUser(user: User): Observable<boolean>;
    deleteUser(id: number): Observable<boolean>;
}