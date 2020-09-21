import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ThemeService } from "./_services/theme.service";
import { ThemeGuard } from "./_guards/theme.guard";
import { InvocationService } from "./_interceptors/invocation.service";
import { TempEnrolledGuard } from "./_guards/temp-enrolled.guard";
import { EncryptDecryptService } from "./_services/encrypt-decrypt.service";
import { HandleStorageService } from "./_services/handleStorage.service";
import { BhdStepsHeaderComponent } from "./_components/bhd-steps-header/bhd-steps-header.component";
import { BhdStepsComponent } from "./_components/bhd-steps/bhd-steps.component";

const IMPORTS = [BrowserModule, HttpClientModule];
const PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InvocationService,
    multi: true,
  },
  ThemeService,
  EncryptDecryptService,
  HandleStorageService,
  ThemeGuard,
  TempEnrolledGuard,
];
const DECLARATIONS = [BhdStepsComponent, BhdStepsHeaderComponent];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...IMPORTS],
  exports: [...IMPORTS, DECLARATIONS],
  providers: [...PROVIDERS],
})
export class BhdModule {}
