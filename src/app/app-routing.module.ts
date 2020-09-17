import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThemeGuard } from "./_guards/theme.guard";
import { WorkitemComponent } from "./workitem/workitem.component";
import { TempEnrolledGuard } from "./_guards/temp-enrolled.guard";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "data/:app/:platform",
    component: WorkitemComponent,
    canActivate: [ThemeGuard, TempEnrolledGuard],
  },
  {
    path: "data",
    canActivate: [ThemeGuard, TempEnrolledGuard],
    pathMatch: "full",
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
