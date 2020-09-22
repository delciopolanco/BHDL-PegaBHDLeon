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
    //"eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIifQ.JfL5YemY77SIAn8unSrg0OEhKJoxyAI4bLoMfos5ZYwm89cAGWI1c-eVOdU8V1NjGTreAgEKVHcJD2mut8rkTczFnoOK0C1yhTscCnMRWewJpQfIjPGu-VGl9lQ3cbdkDawzdVs4jHGxQCbO-ai0EyLS8v0NWAYNzhrpcvr7HfcKBgZM4__Q6VvNE5MivR2k7vhU5YNPNPpE0RZG8V2zkc4Q0d4Sf1oWyzIAgeoZn6KDPIh3hUBOpw5xOg-ucGxXlLm2jdwMb3xqhaDth0Vw-4okUoMZS47ea7yEZXoFifnnaHhQfP5nktscQTjjHR065HeWTT0rDRPKrUvx5Lhrvg.T7YDUBztV5I-PTVMoiB9cg.IIfwDWOFazDXBRJx4S-6s84fUHE_zVeLarKmpwmrqCNyxZdF3uPHpb0KEmcZCeeD_syO_r0X-l7AGKu6KKIm_SW4WJDsOJ9-4BouQwQbfXbG3me8uaWzhKktZ2WWYtHPD3jlLb-PB81JQhNQyo6ZefFNa7LgJI2azGyt81s0ZbDeN2rYEVKEmDE1E_YDeqc9hEOdWgKpwerteg7Lxl28yP4rSbhgkp26j5wUIr6IZbUI6RO63-OrW1ZO3t_B7GoGrOeh-w_l5YqxyACQswqaBg.ybrr94_QT2PQvmfCMhjXK9PGYyPZCHh4jFJZdWzzVb4";

    const deviceId = "4fdf68d2-3c72-4713-912c-458a78079999";
    const credentials = {
      clientId: "dbc9f7de-bdfc-417e-8336-5a98c6112a03",
      clientSecret: "3636eb21-d270-4856-8ec9-5b68d7ac2ad7",
      x509cert:
        "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMyakNDQWNLZ0F3SUJBZ0lFWUdicmhUQU5CZ2txaGtpRzl3MEJBUVVGQURBdk1TMHdLd1lEVlFRREV5UTAKWm1SbU5qaGtNaTB6WXpjeUxUUTNNVE10T1RFeVl5MDBOVGhoTnpnd056azVPVGt3SGhjTk1qQXdPVEl5TVRRMQpOakU0V2hjTk1qSXdPVEl5TVRRMU5qRTRXakF2TVMwd0t3WURWUVFERXlRMFptUm1OamhrTWkwell6Y3lMVFEzCk1UTXRPVEV5WXkwME5UaGhOemd3TnprNU9Ua3dnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUsKQW9JQkFRRFZoeUpBZ0tMMjQ1S0tydHFGSDcyTlkxWkNGaWVsRjRLNWF1OHo0cUw1R3N6QUJHdWgxQzQyN3JzOQpIRGZJYTFZWm8vam05b2FOTmVBemRVdXpvWWZMSU5hdjd3dnFMSlVDenozWTZiR0lVSnRFUkwwT1cxMm11SVByCmIyMXlVSkxvOWYvMCtGZEVPNUxXVkNGYWVoR2NtN04vRGRYZmRIUlhRcWlsRm5oODdKaHRaeU0xZC81ekc4R0UKVkl6aEcrWEQ5RkdMT0xOR0hWbERqeDAvVkxVVDdlUnA5ajJMZ0t6Y2FlYUYrNCszcXR2NnN6YnRkRTl6QjYvUApHL2EvbDBvNk5WaU5qTDF4bzMzc1plSHZoM3ZPYmZQeG5vVFJVQkRONlp5UWFOQzhzd2F6WGI2SmpHQUhRcnZqCkoweVZ6UEs3cm5xUEJ5ZzVJZXNmQ2ZyS2IxQnpBZ01CQUFFd0RRWUpLb1pJaHZjTkFRRUZCUUFEZ2dFQkFFeVoKUkdvakhHNEN4MEYxYStlemRmSjlrVnBjRlpnZ3ZONzh2MjhLS1RDem8xb0sxMmJ4bnpjbGhPQmJhRmlObERDNgpranpJZkF2ZFdNVUdNVXZCbkNlWmNSb0tETHRYaHNzSExFRmF0cEZ5cTV4NUNOdEllcXFiZURlSFExM0JpbVQ4CngxNEwzQSsvajgyWVRxMGY0VzFzVS9YWGNQVW8ySlBGczd3QlNha0phR011K2JFbDk5QzdiZUlkSDgraUJoYzUKMzVhaU9kNnA4NWhQUWp0QmlkbmYxZkZidjdRVGxvNmVVMkNzbUFjMHdvUFJpeDRUY0RHUVhBN1FzamkveHVoNAp6b3l5WUY1QXNadDdHZkI4ck9UWTFKYmJvc1Y4YzFHM2p6VjhoU1hBNExOakVQMExWdEx2ODZpYVRLUTNzRVliCm04cUs0UU9SZ1JyMU1TMmZUT009Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K",
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
