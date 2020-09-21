import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { AppNames } from "../_enums/appNames.enum";
import { Platforms } from "../_enums/platforms.enum";
import { Themes } from "../_enums/themes.enum";

@Injectable()
export class ThemeService {
  constructor(private http: HttpClient) {}

  private themeBs$ = new BehaviorSubject<string>("default");
  public theme$ = this.themeBs$.asObservable();

  setTheme(platform: string, appName: string) {
    let theme = this.getThemeByNameAndPlatform(appName, platform);
    this.themeBs$.next(theme);
    document.querySelector("body").setAttribute("theme", theme);
  }

  getThemeByNameAndPlatform(appName, platform) {
    switch (appName) {
      case AppNames.MBP: {
        const { MBP_ANDROID, MBP_IOS, DEFAULT } = Themes;
        return platform === Platforms.ANDROID
          ? MBP_ANDROID
          : platform === Platforms.IOS
          ? MBP_IOS
          : DEFAULT;
      }
      case AppNames.MBE: {
        const { MBE_ANDROID, MBE_IOS, DEFAULT } = Themes;
        return platform === Platforms.ANDROID
          ? MBE_ANDROID
          : platform === Platforms.IOS
          ? MBE_IOS
          : DEFAULT;
      }
      default:
        return Themes.DEFAULT;
    }
  }
}
