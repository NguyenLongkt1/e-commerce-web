import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let modifiedReq = req;
  // Kiểm tra nếu request có params, thực hiện encodeURIComponent
  if (req.params.keys().length > 0) {
    let encodedParams = req.params.keys().reduce((params, key) => {
      const encodedKey = encodeURIComponent(key);
      let encodedValue = '';
      if(req.params.get(key) && typeof req.params.get(key) === 'string'){
        encodedValue = encodeURIComponent(req.params.get(key)?.trim()!);
      }else{
        encodedValue = encodeURIComponent(req.params.get(key) || '');
      }
      return params.set(encodedKey, encodedValue);
    }, req.params);

    modifiedReq = req.clone({ params: encodedParams });
  }
  const token = sessionStorage?.getItem('token') ?? undefined;
  if (token) {
    const cloned = modifiedReq.clone({
      setHeaders: {
        authorization: 'Bearer '+token,
      },
    });
    return next(cloned);
  } else {
    console.log('checkToken: ',token,sessionStorage)
    return next(modifiedReq);
  }
};