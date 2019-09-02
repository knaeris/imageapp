import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({
            headers: new HttpHeaders({
                "X-ID": this.authService.person ? this.authService.person.id.toString() : "",
                "X-Name": this.authService.person ? this.authService.person.name : ""
            })
        })

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse && event.headers.get("X-ID")) {
                    this.authService.authenticate(parseInt(event.headers.get("X-ID")) )
                }
            })
        );
    }
}