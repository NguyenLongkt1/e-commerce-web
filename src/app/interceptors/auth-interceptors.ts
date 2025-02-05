import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = sessionStorage?.getItem('token') ?? undefined;
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: 'Bearer '+token,
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json'
      },
    });
    return next(cloned);
  } else {
    console.log('checkToken: ',token,sessionStorage)
    return next(req);
  }
};