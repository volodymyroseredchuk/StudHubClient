import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { ProfileComponent } from './profile/profile.component';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TagsModule } from './tags/tags.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
>>>>>>> 9a41a375b7239708a19f5ee6eaddf3a1a5fe8bbb

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    ProfileComponent
=======
    HomeComponent,
    HeaderComponent,
    FooterComponent
>>>>>>> 9a41a375b7239708a19f5ee6eaddf3a1a5fe8bbb
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TagsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
