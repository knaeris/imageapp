import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BaseService{

    private apiUrl = "http://localhost:8080/api/";

    constructor(private http: HttpClient) {
    }

    public get<X>(url: string): Promise<X>{
        return this.http.get(this.apiUrl + url).toPromise()
            .then(result=> <X> result);
    }

    public post<X, Y>(url: string, params?: Y): Promise<X>{
        return this.http.post(this.apiUrl + url, params).toPromise()
            .then(result=> <X> result);
    }
}