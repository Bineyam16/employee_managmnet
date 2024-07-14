import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  @ViewChild('sidebarTreeviewInstance') public sidebarTreeviewInstance?: SidebarComponent;
  @ViewChild('treeviewInstance') public treeviewInstance?: TreeViewComponent;

  public width: string = '290px';
  public enableDock: boolean = true;
  public dockSize: string = '44px';
  public mediaQuery: string = '(min-width: 600px)';
  public target: string = '.main-content';
  public isOpen: boolean = false; // Track sidebar open state

  public data: Object[] = [
    // {
    //     nodeId: '01', nodeText: 'Employee', iconCss: 'icon-microchip icon',
    // }
  ];
  
  public field: Object = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };

  public onCreated(args: any) {
    if (this.sidebarTreeviewInstance) {
      this.sidebarTreeviewInstance.element.style.visibility = 'hidden';
    }
  }

  public onClose(args: any) {
    if (this.treeviewInstance) {
      this.treeviewInstance.collapseAll();
    }
  }

  public nodeClicked(args: any): void {
    console.log(args.node.getAttribute('data-uid'), 'args.node.getAttribute');

    if (args.node.getAttribute('data-uid') === '01') {
      this.router.navigate(['/registrations']);
    }
  }

  openClick() {
    if (this.sidebarTreeviewInstance!.isOpen) {
      this.sidebarTreeviewInstance!.hide();
      this.treeviewInstance!.collapseAll();
      this.sidebarTreeviewInstance!.element.style.visibility = 'hidden'; // Hide the sidebar
    } else {
      this.sidebarTreeviewInstance!.show();
      this.treeviewInstance!.expandAll();
      this.sidebarTreeviewInstance!.element.style.visibility = ''; // Show the sidebar
    }
  }
}
