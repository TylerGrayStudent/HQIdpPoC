import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MSALFranchiseInstanceFactory,
  MSALGuardConfigFactory,
} from './b2c/b2c.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    MsalGuard,
    MsalBroadcastService,
    MsalService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALFranchiseInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
