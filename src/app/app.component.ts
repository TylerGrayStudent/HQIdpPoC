import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalFranchiseConfig } from './auth-config';
import { AuthService } from './auth/auth.service';
import { B2cService } from './b2c/b2c.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public res: any;
  constructor(
    private b2c: B2cService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private service: MsalService
  ) {
    console.log('AppComponent');
  }

  ngOnInit() {
    this.route.fragment.subscribe(async (fragment) => {
      if (fragment) {
        this.service.instance = new PublicClientApplication(
          msalFranchiseConfig
        );
        const res = await this.service.instance.handleRedirectPromise();
        // This is where you get your AuthN token.
        this.auth.handleAzureToken(res?.idToken ?? '').subscribe((x) => {
          this.res = x;
        });
      }
    });
  }
  title = 'HQIdpPoC';

  onLoginClick(): void {
    this.b2c.login();
  }
}
