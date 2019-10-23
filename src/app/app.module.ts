import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { conversationReducer } from './store/reducers';
import { HeaderComponent } from './components/header/header.component';
import { NumberCounterComponent } from './components/number-counter/number-counter.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NumberCounterComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      conversation: conversationReducer
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
