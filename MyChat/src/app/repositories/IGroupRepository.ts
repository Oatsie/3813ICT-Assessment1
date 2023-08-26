import { Observable } from "rxjs";
import { Group } from "../../../server/entities/Group";

export interface IGroupRepository{
    getAllGroups(): Observable<Group[]>;
    getGroupById(id: number): Observable<Group> | Observable<undefined>;
    createGroup(group: Group): Observable<Error> | Observable<boolean>;
    updateGroup(group: Group): Observable<boolean>;
    deleteGroup(id: number): Observable<boolean>;
}