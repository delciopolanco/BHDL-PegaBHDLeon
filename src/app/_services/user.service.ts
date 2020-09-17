import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { endpoints } from "./endpoints";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  authUrl = endpoints.BASEURL + endpoints.AUTH;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    const encodedUser = btoa(userName + ":" + password);
    const encodePyUser = btoa(environment.PY_USER_IDENTIFIER); //Temporal

    let authParams = new HttpParams();
    let authHeaders = new HttpHeaders();

    console.log(encodePyUser);
    authHeaders = authHeaders.append("Authorization", "Basic " + encodedUser);
    //.append("pyuseridentifier", encodePyUser) //Temporal
    //.append("userfullname", encodePyUser); //Temporal

    localStorage.setItem("userName", userName);
    localStorage.setItem("encodedUser", encodedUser);

    return this.http.get(this.authUrl + "/", {
      observe: "response",
      params: authParams,
      headers: authHeaders,
    });
  }
}
