import { Component,ViewChild  } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
//import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-registration';
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  public type: string = 'Push';
  public target: string = '.content';
  @ViewChild('togglebtn')
  public togglebtn?: ButtonComponent;
  public onCreated(args: any) {
      (this.sidebar as SidebarComponent).element.style.visibility = '';
  }
  btnClick(){
      if((this.togglebtn as ButtonComponent).element.classList.contains('e-active')){
          (this.togglebtn as ButtonComponent).content = 'Open';
          this.sidebar?.hide();
      }
      else{
          (this.togglebtn as ButtonComponent).content = 'Close';
          this.sidebar?.show();
      }
  }
  closeClick() {
       this.sidebar?.hide();
       (this.togglebtn as ButtonComponent).element.classList.remove('e-active');
       (this.togglebtn as ButtonComponent).content = 'Open'
  }
}
