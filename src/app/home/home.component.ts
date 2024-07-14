import { Component } from '@angular/core';
import {ViewChild  } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
//import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  @ViewChild('sidebarTreeviewInstance')
    public sidebarTreeviewInstance?: SidebarComponent;
    @ViewChild('treeviewInstance')
    public treeviewInstance?: TreeViewComponent;
    public width: string = '290px';
    public enableDock: boolean = true;
    public dockSize:string ="44px";
    public mediaQuery: string = ('(min-width: 600px)');
    public target: string = '.main-content';
  
    public data: Object[] = [
        {
            nodeId: '01', nodeText: 'Employee', iconCss: 'icon-microchip icon',
        }

    ];
    public field:Object ={ dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };

    public onCreated(args: any) {
        (this.sidebarTreeviewInstance as SidebarComponent).element.style.visibility = '';
    }
    
    public onClose(args: any) {
        (this.treeviewInstance as TreeViewComponent).collapseAll();
    }
    public nodeClicked(args: any): void {
      console.log(args.node.getAttribute('data-uid'),'args.node.getAttribute');
      
      if (args.node.getAttribute('data-uid') == '01') { // Check if the clicked node is Employee
        this.router.navigate(['/registrations']);
      }
    }
    openClick() {
        if((this.sidebarTreeviewInstance as SidebarComponent).isOpen)
        {
            (this.sidebarTreeviewInstance as SidebarComponent).hide();
            (this.treeviewInstance as TreeViewComponent).collapseAll();
        }
        else {
            (this.sidebarTreeviewInstance as SidebarComponent).show();
            (this.treeviewInstance as TreeViewComponent).expandAll();
        }  
    }
}
