import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DashboardLayoutAllModule } from '@syncfusion/ej2-angular-layouts';
import { HomeComponent } from './home/home.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups'
import { TabAllModule } from '@syncfusion/ej2-angular-navigations'
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars'
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs'
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns'
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids'
import { FormsModule } from '@angular/forms'
import { DialogAllModule } from '@syncfusion/ej2-angular-popups'
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { NgIf } from '@angular/common';
import { FilterService, SortService, IFilter, VirtualScrollService,EditService  } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    RegistrationDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabAllModule,
    GridModule, NgIf, RatingModule,
    GridAllModule,
    DialogAllModule,
    DatePickerAllModule,
    DropDownListAllModule,
    NumericTextBoxAllModule,
    DialogModule,
    DashboardLayoutAllModule,
    SidebarModule,
    
    AppRoutingModule,
    ReactiveFormsModule,
    DropDownListModule,
    HttpClientModule,
    TextBoxModule,
    ButtonModule,
    TreeViewModule,
    DatePickerModule
  ],
  providers: [FilterService, SortService, VirtualScrollService,EditService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
