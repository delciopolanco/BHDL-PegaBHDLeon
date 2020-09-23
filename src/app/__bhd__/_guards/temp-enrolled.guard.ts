import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Platforms } from "../_enums/platforms.enum";
import { APISecurity } from "../../_models/iApiSecurity.model";
import { HandleStorageService } from "../_services/handleStorage.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class TempEnrolledGuard implements CanActivate {
  constructor(
    private router: Router,
    private handleStorage: HandleStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log("Temp Enrollment Guard initialized!");
    const theme = JSON.parse(localStorage.getItem("theme"));
    // if (
    //   !theme //&&
    //   //(theme.platform === Platforms.ANDROID || theme.platform === Platforms.IOS)
    // ) {
    this.setCredentialsToLocalStorage(route);
    // } else {
    //   this.removeCredentialsFromLocalStorage();
    // }
    return true;
  }

  removeCredentialsFromLocalStorage = async () => {
    const credentials = this.handleStorage.getFromStorage("credentials");
    const jwt = this.handleStorage.getFromStorage("jwt");
    const deviceId = this.handleStorage.getFromStorage("deviceId");
    const Pyuseridentifier = this.handleStorage.getFromStorage(
      "Pyuseridentifier"
    );

    const Userfullname = this.handleStorage.getFromStorage("Userfullname");
    if (credentials && jwt && deviceId && Pyuseridentifier && Userfullname) {
      await this.handleStorage.removeInStorage([
        "credentials",
        "jwt",
        "deviceId",
        "Pyuseridentifier",
        "Userfullname",
      ]);
    }
  };
  setCredentialsToLocalStorage = async (route) => {
    const jwt = route.params["jwt"];
    const deviceId = environment.deviceId;
    const credentials = { ...environment.credentials };
    const Pyuseridentifier = "TWFyaW9UZXN0U2FtcGxl";
    const Userfullname = "TWFyaW9UZXN0U2FtcGxl";

    await this.handleStorage.setInStorage("jwt", jwt);
    await this.handleStorage.setInStorage("deviceId", deviceId);
    await this.handleStorage.setInStorage(
      "credentials",
      JSON.stringify(credentials)
    );
    await this.handleStorage.setInStorage("Pyuseridentifier", Pyuseridentifier);
    await this.handleStorage.setInStorage("Userfullname", Userfullname);
  };
}
