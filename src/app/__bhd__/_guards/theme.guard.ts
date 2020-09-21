import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { ThemeService } from "../_services/theme.service";

@Injectable()
export class ThemeGuard implements CanActivate {
  constructor(private themeService: ThemeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log("Theme Guard initialized!");
    const theme = this.getTheme(route);
    if (theme) {
      const { platform, appName } = theme;
      this.themeService.setTheme(platform, appName);
    }
    return true;
  }

  getThemeByLocalStorage() {
    const theme = JSON.parse(localStorage.getItem("theme"));
    return theme && theme.platform && theme.appName;
  }

  getTheme(route) {
    let theme = {
      platform: route.params["platform"],
      appName: route.params["app"],
    };
    if (theme.platform && theme.appName) {
      if (this.getThemeByLocalStorage()) {
        return JSON.parse(localStorage.getItem("theme"));
      }
      localStorage.setItem("theme", JSON.stringify(theme));
      return theme;
    }

    localStorage.removeItem("theme");
    return null;
  }
}
