import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Thread} from "../model/thread";

@Injectable({
    providedIn: 'root'
})
export class ThreadService extends BaseService{

    public getAllThreads(): Promise<Thread[]>{
        return super.get("threads")
    }

    public getThreadById(id: bigint): Promise<Thread>{
        return super.get("threads/" + id);
    }
}