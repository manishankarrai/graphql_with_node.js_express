import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GraphqlComponent } from './graphql/graphql.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent , 
    GraphqlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule , 
    CommonModule , 
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
