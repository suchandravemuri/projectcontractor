import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainframeComponent } from './mainframe/mainframe.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {HttpClientModule} from '@angular/common/http'
import { AddContractorFormComponent } from './add-contractor/add-contractor.component';
import { EntityComponent } from './entity/entity.component';
import { LocationComponent } from './location/location.component';
import { WorkorderComponent } from './workorder/workorder.component';
import { CompletelocationComponent } from './completelocation/completelocation.component';
import { GeneratebillComponent } from './generatebill/generatebill.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainframeComponent,
    TopBarComponent,        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AddContractorFormComponent,
    EntityComponent,
    FormsModule,
    LocationComponent,
    WorkorderComponent,
    CompletelocationComponent,
    GeneratebillComponent,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
