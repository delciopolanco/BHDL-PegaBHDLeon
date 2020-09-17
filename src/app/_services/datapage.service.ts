import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endpoints } from "./endpoints";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DatapageService {
  constructor(private http: HttpClient) {}

  dataPageUrl = endpoints.BASEURL + endpoints.DATA;

  pxResults: Object;

  getDataPage(id, dpParams) {
    let dataHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");
    const encodePyUser = btoa(environment.PY_USER_IDENTIFIER); //Temporal

    dataHeaders = dataHeaders.append("Authorization", "Basic " + encodedUser);
    dataHeaders = dataHeaders.append("Content-Type", "application/json");
    //.append("pyuseridentifier", encodePyUser) //Temporal
    //.append("userfullname", encodePyUser); //Temporal

    return this.http.get(this.dataPageUrl + "/" + id, {
      observe: "response",
      params: dpParams,
      headers: dataHeaders,
    });
  }

  getResults(response) {
    return response.pxResults;
  }
}
