import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThemeGuard } from "./__bhd__/_guards/theme.guard";
import { WorkitemComponent } from "./workitem/workitem.component";
import { TempEnrolledGuard } from "./__bhd__/_guards/temp-enrolled.guard";
import { AppComponent } from "./app.component";
import { WorklistComponent } from "./worklist/worklist.component";

const routes: Routes = [
  {
    path: "data/:app/:platform",
    component: WorkitemComponent,
    canActivate: [ThemeGuard, TempEnrolledGuard],
  },
  {
    path: "",
    canActivate: [ThemeGuard, TempEnrolledGuard],
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
