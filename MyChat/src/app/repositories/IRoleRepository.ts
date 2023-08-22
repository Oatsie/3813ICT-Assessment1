import { Observable } from "rxjs";
import { Role } from "../entities/Role";

export interface IRoleRepository{
    getAllRoles(): Observable<Role[]>;
    getRoleById(id: number): Observable<Role> | Observable<undefined>;
    createRole(role: Role): Observable<Error> | Observable<boolean>;
    updateRole(role: Role): Observable<boolean>;
    deleteRole(id: number): Observable<boolean>;
}