import {Injectable} from "@angular/core";
import {Person} from "../model/person";
import {ChatSession} from "../model/chatsession";
import {Observable} from "rxjs";

@Injectable()
export class AuthService{
    person: Person;
    person$: Observable<Person>;
    session: ChatSession;

    public authenticate(id: number){
        this.person$ = new Observable((observer) => {
            observer.next(new Person(id, name));
            observer.complete();
        });
        if(!this.person){
            return this.person = new Person(id, name);
        }
    }

    public getId(){
        return this.person.id;
    }

    public static getCurrentUser(a: AuthService){
        return a.person;
    }
}