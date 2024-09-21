import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {
  @ViewChild(SidebarComponent) sidebar: SidebarComponent|undefined;
}
