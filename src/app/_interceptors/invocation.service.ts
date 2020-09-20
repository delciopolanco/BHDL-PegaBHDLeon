import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { EncryptDecryptService } from "../_services/encrypt-decrypt.service";
import { HandleStorageService } from "../_services/handleStorage.service";
import * as uuid from "uuid";
import { HttpMethod } from "../_enums/httpMethods.enum";
import { BasicRequest } from "../_models/BasicRequest.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class InvocationService implements HttpInterceptor {
  constructor(
    private encryptDecryptService: EncryptDecryptService,
    private handleStorageService: HandleStorageService
  ) {}

  header: HttpHeaders = null;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Interceptor Http initialized!");
    console.log("-----------------------------------------------------");
    let cloneRequest = null;
    const headers = this.getHeaders();
    console.log(`-----URL=>  ${req.url}---------------`);
    switch (req.method) {
      case HttpMethod.GET:
        const querystring = this.getParamsFormat(req.params);
        const paramFormat = this.getRequestGetFormat(querystring);

        console.log("GET query params =>", paramFormat);
        let url =
          req.url.charAt(req.url.length - 1) === "/"
            ? req.url.substring(0, req.url.length - 1)
            : req.url;

        const tempStr = JSON.stringify(paramFormat);
        console.log({ tempStr });

        const tempParam = this.encryptDecryptService.encrypt(tempStr);

        console.log({ tempParam });
        const encode = encodeURIComponent(tempParam);
        console.log({ encode });

        url = url + "?" + encode;
        cloneRequest = req.clone({
          headers,
          params: new HttpParams(),
          url,
        });
        break;
      case HttpMethod.POST:
        const basicReq = this.getBasicRequest(req.body);
        const bodyToEncrypt = JSON.stringify({ ...basicReq });
        const body = {
          data: this.encryptDecryptService.encrypt(bodyToEncrypt),
        };
        console.log("Req  --->", basicReq);
        cloneRequest = req.clone({
          headers,
          body,
        });
        break;
      case HttpMethod.PUT:
        break;
      case HttpMethod.DELETE:
        break;

      default:
        console.log("DEFAULT");
        break;
    }
    return next.handle(cloneRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const { data } = event.body;
          if (data) {
            const decryptData = this.encryptDecryptService.decrypt<any>(data);
            const cloneResponse = event.clone({
              body: decryptData,
            });
            return cloneResponse;
          }
        }
        return event;
      })
    );
  }

  getParamsFormat(params) {
    let paramAsObject = params.keys().reduce((object, key) => {
      object[key] = params.get(key);
      return object;
    }, {});
    return this.serializeQueryString(paramAsObject);
  }
  private serializeQueryString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  public getHeaders() {
    // const credential = this.handleStorageService.getFromStorage("credentials");
    const encryptUUID = this.encryptDecryptService.getKey(false);

    return new HttpHeaders({
      "x-keyvalue": encryptUUID.xkey,
      jwt: this.handleStorageService.getFromStorage("jwt"),
      Pyuseridentifier: this.handleStorageService.getFromStorage(
        "Pyuseridentifier"
      ),
      Userfullname: this.handleStorageService.getFromStorage("Userfullname"),
    });
  }

  public getRequestGetFormat(querystring) {
    const deviceId = this.handleStorageService.getFromStorage("deviceId");
    console.log({ deviceId });
    return {
      channel: "MOBILE",
      transactionId: uuid.v4().split("-").join("").slice(0, 24),
      deviceId,
      querystring,
    };
  }
  public getBasicRequest(params: any): BasicRequest {
    return {
      channel: "MOBILE",
      transactionId: uuid.v4().split("-").join("").slice(0, 24),
      deviceId: this.handleStorageService.getFromStorage("deviceId"),
      payload: {
        ...params,
      },
    };
  }
}
