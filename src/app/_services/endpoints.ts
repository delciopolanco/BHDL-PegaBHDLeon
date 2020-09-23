import { environment } from "../../environments/environment";

export const endpoints = {
  // Change this URL if you want to point the React application at another Pega server.
  //BASEURL: "http://10.0.2.2:8080/prweb/api/v1",
  //BASEURL:"https://api-dev.bhdleon.com.do/bhdleon/api/v1/personal/pega-self-service",
  BASEURL: environment.apiUrl,

  AUTH: "/authenticate",
  CASES: "/cases",
  CASETYPES: "/casetypes",
  VIEWS: "/views",
  ASSIGNMENTS: "/assignments",
  ACTIONS: "/actions",
  PAGES: "/pages",
  DATA: "/data",
  REFRESH: "/refresh",
};
