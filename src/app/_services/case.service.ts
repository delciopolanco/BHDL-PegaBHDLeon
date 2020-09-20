import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { endpoints } from "./endpoints";
import { ReferenceHelper } from "../_helpers/reference-helper";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CaseService {
  refHelper: ReferenceHelper = new ReferenceHelper();

  constructor(private http: HttpClient) {}

  caseUrl = endpoints.BASEURL + endpoints.CASES;
  caseTypeUrl = endpoints.BASEURL + endpoints.CASETYPES;

  pxResults: Object;

  getCaseExternal() {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    const body = {
      caseTypeID: "BHD-SelfService-BHDCLM-Work-CLM-OnboardNewCust",
      processID: "pyStartCase",
      content: {
        CasesServiceRequestData: {
          PrimaryIDType: "Identity card",
          PrimaryIDValue: "00116179508",
          IdExpirationDateTxt: "09/30/2020",
          FirstName: "YELINETT",
          MiddleName: "RAMONA",
          LastName: "BAEZ",
          MaidenName: "RODRIGUEZ",
          DateOfBirthTxt: "05/23/1996",
          NationalityCode: "1",
          Nationality: "República Dominicana",
          Gender: "Femenino",
          CityOfBirth: "República Dominicana",
          MaritalStatus: "Soltero",
          BirthCountryCode: "DO",
          CountryOfBirth: "República Dominicana",
          PhoneNumber: "1234567891",
          pyEmailAddress: "david.guzman.arenales@gt.ey.com",
          ProductID: "TBD",
          pyProductName: "Cuenta de ahorros digital",
          pyChannel: "MBP",
          DeviceID: "20013fea6bcc820c",
          CaseType: "Digital Onboarding Customer",
        },
      },
    };

    caseHeaders = caseHeaders
      .append("Authorization", "Basic " + encodedUser)
      .append("Content-Type", "application/json")
      .append("Access-Control-Expose-Headers", "etag");

    return this.http.post<{
      ID: string;
      nextAssignmentID: string;
      nextPageID: string;
      pxObjClass: string;
    }>(endpoints.BASEURL + endpoints.CASES, body, {
      observe: "response",
      params: caseParams,
      headers: caseHeaders,
    });
  }

  // get a case of given id
  getCase(id) {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");
    const encodePyUser = btoa(environment.PY_USER_IDENTIFIER); //Temporal

    caseHeaders = caseHeaders
      .append("Authorization", "Basic " + encodedUser)
      .append("Content-Type", "application/json")
      .append("Access-Control-Expose-Headers", "etag");

    return this.http.get(this.caseUrl + "/" + id, {
      observe: "response",
      params: caseParams,
      headers: caseHeaders,
    });
  }

  // get a list of possible case types to create
  getCaseTypes() {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");

    return this.http.get(this.caseTypeUrl, {
      observe: "response",
      params: caseParams,
      headers: caseHeaders,
    });
  }

  // get a case that is "new"
  getCaseCreationPage(id) {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");

    return this.http.get(this.caseTypeUrl + "/" + id, {
      observe: "response",
      params: caseParams,
      headers: caseHeaders,
    });
  }

  // create a case (with new or skip new)
  createCase(id, content) {
    var caseParams = new HttpParams();

    var caseBody: any = {};
    caseBody.caseTypeID = id;
    (caseBody.processID = "pyStartCase"), (caseBody.content = content);
    const encodedUser = localStorage.getItem("encodedUser");

    var caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");

    return this.http.post(this.caseUrl, caseBody, {
      observe: "response",
      params: caseParams,
      headers: caseHeaders,
    });
  }

  // update a case, save to server
  updateCase(caseID, eTag, actionName, body, pageInstr) {
    var caseParams = new HttpParams();
    if (actionName && actionName != "") {
      caseParams = caseParams.append("actionID", actionName);
    }
    const encodedUser = localStorage.getItem("encodedUser");

    var caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");
    caseHeaders = caseHeaders.append("If-Match", '"' + eTag + '"');

    let oContent = this.refHelper.getPostContent(body);

    let encodedId = encodeURI(caseID);

    if (pageInstr.pageInstructions.length > 0) {
      return this.http.put(
        this.caseUrl + "/" + encodedId,
        { content: oContent, pageInstructions: pageInstr.pageInstructions },
        { observe: "response", params: caseParams, headers: caseHeaders }
      );
    } else {
      return this.http.put(
        this.caseUrl + "/" + encodedId,
        { content: oContent },
        { observe: "response", params: caseParams, headers: caseHeaders }
      );
    }
  }

  // refresh a case, post data, but no save
  refreshCase(myCase, body) {
    var caseParams = new HttpParams();
    const encodedUser = localStorage.getItem("encodedUser");

    var caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");
    caseHeaders = caseHeaders.append("If-Match", myCase.etag);

    let oContent = this.refHelper.getPostContent(body);

    let encodedId = encodeURI(myCase.ID);

    return this.http.put(
      this.caseUrl + "/" + encodedId + endpoints.REFRESH,
      { content: oContent },
      { observe: "response", params: caseParams, headers: caseHeaders }
    );
  }

  // get a case with a given page (new, review, confirm)
  getPage(caseID, pageID) {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");
    const encodePyUser = btoa(environment.PY_USER_IDENTIFIER); //Temporal

    caseHeaders = caseHeaders
      .append("Authorization", "Basic " + encodedUser)
      .append("Content-Type", "application/json")
      .append("pyuseridentifier", encodePyUser) //Temporal
      .append("userfullname", encodePyUser); //Temporal

    return this.http.get(
      this.caseUrl + "/" + caseID + endpoints.PAGES + "/" + pageID,
      { observe: "response", params: caseParams, headers: caseHeaders }
    );
  }

  // get a case and a view layout
  getView(caseID, viewID) {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");

    return this.http.get(
      this.caseUrl + "/" + caseID + endpoints.VIEWS + "/" + viewID,
      { observe: "response", params: caseParams, headers: caseHeaders }
    );
  }

  cases() {
    var caseParams = new HttpParams();
    var caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem("encodedUser");

    caseHeaders = caseHeaders.append("Authorization", "Basic " + encodedUser);
    caseHeaders = caseHeaders.append("Content-Type", "application/json");

    return this.http.get(this.caseUrl, {
      observe: "response",
      params: caseParams,
      headers: caseHeaders,
    });
  }
}
