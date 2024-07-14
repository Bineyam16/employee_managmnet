import { Component, OnInit, AfterViewInit , ElementRef, ViewChild} from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';
import { ServiceServiceService } from '../service-service.service';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

const SERVICE_URI: string = 'https://services.syncfusion.com/angular/production/';
const apiUrl = 'http://localhost:3000';
interface CustomDialogButtons {
  buttonModel: { content: string, isPrimary?: boolean };
  click?: () => void;
}
@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css'],
})
export class RegistrationDialogComponent implements OnInit, AfterViewInit {
  newdata: any;
  target: string = '.container';
  public selectedEmployee: any
  resetFormTrigger: boolean = false;
  @ViewChild('ejDialog') ejDialog: DialogComponent | any;
  @ViewChild('overviewgrid') public grid: GridComponent | any;
  @ViewChild('updateDialog') public updateDialog: DialogComponent | any;
  @ViewChild('registerDialog') public registerDialog: DialogComponent | any;
  @ViewChild('container', { read: ElementRef }) container: ElementRef | any;
  showRegistrationForm: boolean = false;
  public targetElement?: HTMLElement;
  public dReady: boolean = false;
  public dtTime: boolean = false;
  public isDataBound: boolean = false;
  public isDataChanged: boolean = true;
  public intervalFun: any;
  public clrIntervalFun: any;
  public clrIntervalFun1: any;
  public clrIntervalFun2: any;
  public dropSlectedIndex: any;
  public stTime: any;
  public filterSettings: any;
  public selectionSettings: any;
  public loadingIndicator: any;
  public editSettings: any;
  public height: string = '240px';
  public gridInstance!: GridComponent;
  public ddlData: Object[] = [
    { text: '10 Rows and 11 Columns', value: '10' },
    { text: '100 Rows and 11 Columns', value: '100' },
    { text: '1,000 Rows and 11 Columns', value: '1000' },
    { text: '10,000 Rows and 11 Columns', value: '10000' },
    { text: '1,00,000 Rows and 11 Columns', value: '100000' }
  ];
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];
  public query: Query;
  showdialog: boolean= false;
  showadddialog: boolean =false;

  constructor(public service: ServiceServiceService) {
    this.query = new Query().addParams('dataCount', '1000');
  }

  public ngOnInit(): void {
   
    this.service.getEmployees().subscribe((response: any) => {
      console.log(response, 'this.data');
      this.newdata = response;
    });
    this.filterSettings = { type: "Menu" };
    this.loadingIndicator = { indicatorType: 'Shimmer' };
    this.stTime = performance.now();
    this.selectionSettings = { persistSelection: true, type: "Multiple", checkboxOnly: true };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  }
  public updateDialogButtons: CustomDialogButtons[] = [
    {
      buttonModel: { content: 'Close', isPrimary: true },
      click: () => { this.updateDialog.hide(); }
    }
  ];
  public Register: CustomDialogButtons[] = [
    {
      buttonModel: { content: 'Close', isPrimary: true },
      click: () => { this.registerDialog.hide(); }
    }
  ];
  fetchGridData() {
    this.service.getEmployees().subscribe((data: any[]) => {
      this.newdata = data;
    });
  }
  onUpdateEmployee(updatedEmployee: any) {
    // Update employee in the data source
    const index = this.newdata.findIndex((e: { id: any; }) => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.newdata[index] = updatedEmployee;
      // Update grid
      this.grid.refresh();
    }
    // Optionally, update in backend using service
    this.service.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe(() => {
      DialogUtility.alert({
        title: 'Success',
        content: 'Employee updated successfully'
      });
    }, (error) => {
      DialogUtility.alert({
        title: 'Error',
        content: 'Failed to update employee: ' + error.message
      });
    });
  }
  onUpdateEmploye(updatedEmployee: any) {
    // Update employee in the data source
    const index = this.newdata.findIndex((e: { id: any; }) => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.newdata[index] = updatedEmployee;
      // Update grid
      this.grid.refresh();
    }
    // Optionally, update in backend using service
    this.service.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe(() => {
      DialogUtility.alert({
        title: 'Success',
        content: 'Employee Added successfully'
      });
    }, (error) => {
      DialogUtility.alert({
        title: 'Error',
        content: 'Failed to update employee: ' + error.message
      });
    });
  }

  onDeleteRow(employeeId: number): void {
    // Assuming this method should delete the row using your JSON Server service
    // Implement the deletion logic here
    console.log('Deleting employee with ID:', employeeId);

    // Example of how to delete using a service (replace with your actual service call)
    this.service.deleteEmployee(employeeId).subscribe((response) => {
      console.log('Employee deleted successfully:', response); DialogUtility.alert({
        title: 'Success',
        content: 'Employee Deleted successfully'
      })
       this.fetchGridData()
      // Refresh grid or update data source as needed
      // For example:
      // this.grid.refresh(); // If refresh method is available
      // or update your data source and it will reflect automatically in the grid
    }, (error) => {
      DialogUtility.alert({
        title: 'Error',
        content: 'Failed to Deleted employee: ' + error.message
      });
      console.error('Error deleting employee:', error);
    });
  }
  onSaveEmployee(employee: any) {
    this.fetchGridData(); // Refresh the grid data
    this.updateDialog.hide();
    this.registerDialog.hide();
  }
  ngAfterViewInit(): void {
    this.gridInstance.on('data-ready', () => {
      this.dReady = true;
    });
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => {
        if (this.stTime && this.isDataChanged) {
          const msgEle: any = document.getElementById('msg');
          const val: any = (performance.now() - this.stTime).toFixed(0);
          this.stTime = null;
          this.dtTime = false;
          this.isDataChanged = false;
          msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
          msgEle.classList.remove('e-hide');
        }
      });
    });
    observer.observe(document.getElementById('overviewgrid') as Node, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  valueChange(args: any): void {
    clearTimeout(this.clrIntervalFun2);
    this.clrIntervalFun2 = setTimeout(() => {
      this.isDataChanged = true;
      this.stTime = null;
      const contentElement: Element = this.gridInstance.contentModule.getPanel().firstChild as Element;
      contentElement.scrollLeft = 0;
      contentElement.scrollTop = 0;
      this.gridInstance.pageSettings.currentPage = 1;
      this.stTime = performance.now();
    }, 100);
  }

  onDataBound(args: any): void {
    clearTimeout(this.clrIntervalFun);
    clearInterval(this.intervalFun);
    this.dtTime = true;
  }

  openDialog(): void {
    this.showRegistrationForm = true;
  }
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
}
// Sample level code to handle the button click action
onOpenDialog(selectedEmployee: any) {
  // Show update dialog
  this.showdialog =true
  this.selectedEmployee = selectedEmployee;
  this.updateDialog.show();
}
handleFormReset(): void {
  // Handle form reset logic here
  console.log('Form reset triggered.');
  // Optionally, you can refresh the dialog or perform any additional actions
  if (this.registerDialog) {
    this.registerDialog.refresh(); // Refresh dialog if necessary
  }
}
onOpenDialogg() {
  // Show update dialog
  this.showadddialog =true
  // this.selectedEmployee = selectedEmployee;
  this.resetFormTrigger = !this.resetFormTrigger;
  this.registerDialog.show();
}
//Animation options
public animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };
// Enables the footer buttons
public buttons: Object = [
    {
        'click': this.hideDialog.bind(this),buttonModel:{ content:'OK', isPrimary: true }
    },
    {
        'click': this.hideDialog.bind(this),buttonModel:{ content:'Cancel' }
    }
];
}
