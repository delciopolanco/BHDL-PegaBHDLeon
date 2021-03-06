import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MAT_LABEL_GLOBAL_OPTIONS } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule, MatDialogClose } from "@angular/material/dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "@angular/cdk/layout";
import { WorklistComponent } from "./worklist/worklist.component";
import {
  NavigationComponent,
  SettingsdialogComponent,
} from "./navigation/navigation.component";
import { MaintabsComponent } from "./maintabs/maintabs.component";
import { WorklistpanelComponent } from "./worklistpanel/worklistpanel.component";
import {
  WorkitemComponent,
  LocalactiondialogComponent,
} from "./workitem/workitem.component";
import { LayoutComponent } from "./_subcomponents/layout/layout.component";
import { GroupComponent } from "./_subcomponents/group/group.component";
import { ViewComponent } from "./_subcomponents/view/view.component";
import { PageComponent } from "./_subcomponents/page/page.component";
import { FieldComponent } from "./_subcomponents/field/field.component";
import { TopviewComponent } from "./_subcomponents/topview/topview.component";
import { DropdownComponent } from "./_fieldcomponents/dropdown/dropdown.component";
import { CaptionComponent } from "./_subcomponents/caption/caption.component";
import { CreatecaselistComponent } from "./_subcomponents/createcaselist/createcaselist.component";
import { LoginComponent } from "./login/login.component";
import { TextinputComponent } from "./_fieldcomponents/textinput/textinput.component";
import { TextareaComponent } from "./_fieldcomponents/textarea/textarea.component";
import { CheckboxComponent } from "./_fieldcomponents/checkbox/checkbox.component";
import { EmailComponent } from "./_fieldcomponents/email/email.component";
import { UnitdaysComponent } from "./_fieldcomponents/unitdays/unitdays.component";
import { AutocompleteComponent } from "./_fieldcomponents/autocomplete/autocomplete.component";
import { CasedetailsComponent } from "./casedetails/casedetails.component";
import { TextComponent } from "./_fieldcomponents/text/text.component";
import { BreadcrumbComponent } from "./_subcomponents/breadcrumb/breadcrumb.component";
import { DateComponent } from "./_fieldcomponents/date/date.component";
import { ParagraphComponent } from "./_subcomponents/paragraph/paragraph.component";
import { ButtonComponent } from "./_fieldcomponents/button/button.component";
import { LinkComponent } from "./_fieldcomponents/link/link.component";
import { IconComponent } from "./_fieldcomponents/icon/icon.component";
import { RadioComponent } from "./_fieldcomponents/radio/radio.component";
import { AutocompleteFilterComponent } from "./_fieldcomponents/autocomplete-filter/autocomplete-filter.component";
import { RepeatinggridComponent } from "./_subcomponents/repeatinggrid/repeatinggrid.component";
import { RepeatinglayoutComponent } from "./_subcomponents/repeatinglayout/repeatinglayout.component";
import { ToppageComponent } from "./_subcomponents/toppage/toppage.component";
import { SafeHtmlPipe } from "./_pipe/safehtml.pipe";
import { RecentlistComponent } from "./_subcomponents/recentlist/recentlist.component";
import { NumberComponent } from "./_fieldcomponents/number/number.component";
import { NosupportComponent } from "./_fieldcomponents/nosupport/nosupport.component";
import { ReferenceHelper } from "./_helpers/reference-helper";
import { ThemeService } from "./__bhd__/_services/theme.service";
import { ThemeGuard } from "./__bhd__/_guards/theme.guard";
import { InvocationService } from "./__bhd__/_interceptors/invocation.service";
import { TempEnrolledGuard } from "./__bhd__/_guards/temp-enrolled.guard";
import { EncryptDecryptService } from "./__bhd__/_services/encrypt-decrypt.service";
import { HandleStorageService } from "./__bhd__/_services/handleStorage.service";
import { BhdModule } from "./__bhd__/bhd.module";
import { LoadingModalComponent, ModalContentComponent } from './_subcomponents/loading-modal/loading-modal.component';
import { BhdHeaderComponent } from './_subcomponents/bhd-header/bhd-header.component';
import { TryAgainModalComponent, TryAgainModalContentComponent } from './_subcomponents/try-again-modal/try-again-modal.component';

const IMPORTS = [
  BrowserModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatTabsModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatDialogModule,
  BhdModule,
];
const PROVIDERS = [
  { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: "auto" } },
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { floatLabel: "always" },
  },
];
const DECLARATIONS = [
  AppComponent,
  WorklistComponent,
  NavigationComponent,
  MaintabsComponent,
  WorklistpanelComponent,
  WorkitemComponent,
  LayoutComponent,
  GroupComponent,
  ViewComponent,
  PageComponent,
  FieldComponent,
  TopviewComponent,
  DropdownComponent,
  CaptionComponent,
  CreatecaselistComponent,
  LoginComponent,
  TextinputComponent,
  TextareaComponent,
  CheckboxComponent,
  EmailComponent,
  UnitdaysComponent,
  AutocompleteComponent,
  AutocompleteFilterComponent,
  CasedetailsComponent,
  TextComponent,
  BreadcrumbComponent,
  DateComponent,
  ParagraphComponent,
  ButtonComponent,
  LinkComponent,
  IconComponent,
  RadioComponent,
  RepeatinggridComponent,
  RepeatinglayoutComponent,
  ToppageComponent,
  SafeHtmlPipe,
  RecentlistComponent,
  NumberComponent,
  NosupportComponent,
  SettingsdialogComponent,
  LocalactiondialogComponent,
  LoadingModalComponent,
  ModalContentComponent,
  BhdHeaderComponent,
  TryAgainModalComponent,
  TryAgainModalContentComponent
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...IMPORTS],
  entryComponents: [SettingsdialogComponent, LocalactiondialogComponent],
  exports: [MatButtonModule, MatButtonModule],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
