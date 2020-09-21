import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Platforms } from "../_enums/platforms.enum";
import { APISecurity } from "../../_models/iApiSecurity.model";
import { HandleStorageService } from "../_services/handleStorage.service";

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
    this.setCredentialsToLocalStorage();
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
  setCredentialsToLocalStorage = async () => {
    const jwt =
      "eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIifQ.JfL5YemY77SIAn8unSrg0OEhKJoxyAI4bLoMfos5ZYwm89cAGWI1c-eVOdU8V1NjGTreAgEKVHcJD2mut8rkTczFnoOK0C1yhTscCnMRWewJpQfIjPGu-VGl9lQ3cbdkDawzdVs4jHGxQCbO-ai0EyLS8v0NWAYNzhrpcvr7HfcKBgZM4__Q6VvNE5MivR2k7vhU5YNPNPpE0RZG8V2zkc4Q0d4Sf1oWyzIAgeoZn6KDPIh3hUBOpw5xOg-ucGxXlLm2jdwMb3xqhaDth0Vw-4okUoMZS47ea7yEZXoFifnnaHhQfP5nktscQTjjHR065HeWTT0rDRPKrUvx5Lhrvg.T7YDUBztV5I-PTVMoiB9cg.IIfwDWOFazDXBRJx4S-6s84fUHE_zVeLarKmpwmrqCNyxZdF3uPHpb0KEmcZCeeD_syO_r0X-l7AGKu6KKIm_SW4WJDsOJ9-4BouQwQbfXbG3me8uaWzhKktZ2WWYtHPD3jlLb-PB81JQhNQyo6ZefFNa7LgJI2azGyt81s0ZbDeN2rYEVKEmDE1E_YDeqc9hEOdWgKpwerteg7Lxl28yP4rSbhgkp26j5wUIr6IZbUI6RO63-OrW1ZO3t_B7GoGrOeh-w_l5YqxyACQswqaBg.ybrr94_QT2PQvmfCMhjXK9PGYyPZCHh4jFJZdWzzVb4";
    const deviceId = "4fdf68d2-3c72-4713-912c-458a78079999";
    const credentials = {
      clientId: "7e78d60a-0a11-42f0-8672-f8e87e5d1bfc",
      clientSecret: "807c8726-fd4a-474b-ad55-4c34ac21de96",
      x509cert:
        "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMyakNDQWNLZ0F3SUJBZ0lFUWQ2S1pEQU5CZ2txaGtpRzl3MEJBUVVGQURBdk1TMHdLd1lEVlFRREV5UTAKWm1SbU5qaGtNaTB6WXpjeUxUUTNNVE10T1RFeVl5MDBOVGhoTnpnd056azVPVGt3SGhjTk1qQXdPVEU0TWpJMApOalUxV2hjTk1qSXdPVEU0TWpJME5qVTFXakF2TVMwd0t3WURWUVFERXlRMFptUm1OamhrTWkwell6Y3lMVFEzCk1UTXRPVEV5WXkwME5UaGhOemd3TnprNU9Ua3dnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUsKQW9JQkFRQ0NISCt4M1c2SS9meCtQRFNOUEt0N0d1eWh5V0t1WEZFNjN6N3k3TkxMUE80enVvK3VObTVoZEJGMwpTeVVPbkFlK0Nxd2RzZUJnajFYSEswZWNlRUhIRTRCR0t3OTlzOThhYUJvTXo4SGFDc3JKbmdEbno0UXRhZlRICmJ3T0tFRW4wUExHWThpWE50YjBCb3JtcXVEWUxhOU9QdEdtaVhqVFB3ZFQ5VWl3V3NnamFNOHhGTkpzSUJVOTcKc3pwbmN6azU4amUyQXl1eDNpbXVxZm5BdTZYL2JsVnN4WHZZZVdENUIzV0l3VFdaLytYaUFVN09SdlJIUlo2aApvWEdmdkdFK0RZWUhpVWViVzhtN0JNZTVveUtqQ2drUk9vd2tFczRqRndzcXEvbndYeWRDRDZQRUw2VGl2aVpYCnFXUEpLQXZiVzNlOVFDU3gydFFVZ1NXUlFHS1hBZ01CQUFFd0RRWUpLb1pJaHZjTkFRRUZCUUFEZ2dFQkFHMy8KakYrOVVDSUNvaVdEK1lja09MMkI3NDVQbHJzbUlML3lMV0Z6V2pUblVUc204cDlISUtJMlZwMGlOd1V3SVhCUApvbUN6cHlsQ2wzM3ZRYno0MENoeVA3N2E2ZkhQL2NlZXV4aS9TVkg1blY2RGZzOVBOYjNkQy9lZTNJUEp3TUdzCnZzQWhNeGtGWHdBNWxTUG9pbjBMbklmTU8xMjhnUk9CRlZ0MVprd1lyY0hLTWFmVDlVdjBuZGRSUjhZU3FVdHIKcTd4c1VCM2o1U3I2V3RXS0VEZ1F3ZUU0YUxYc1pZQVh6NnljdzR1Sk11RTNFcDIxSDNaeXI3R0piekNoSEllbwpSS2hMSk16bDRGOUJvd1VGN2gwdUgyNUh3UVI2Y0pEL2Y2U1MyeVpOeGVUUDlvcVNxZy9JUnRlY3ZrYzhKUEI2CjQrNk5iZlhOWEdVd3ppajQ3K009Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K",
    };

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
