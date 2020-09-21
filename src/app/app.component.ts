import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { ThemeService } from "./__bhd__/_services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "app";
  loggedIn: boolean = false;
  isPlatformMobile: boolean;
  private subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    const theme$ = this.themeService.theme$.pipe(
      tap((theme) => (this.isPlatformMobile = theme !== "default"))
    );
    this.subscription.add(theme$.subscribe());
  }
}
