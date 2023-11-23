import { Component } from '@angular/core';
import { PoMenuItem, PoNavbarItem } from '@po-ui/ng-components';
import { navegaMenusArray } from './service/menus.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {

   readonly menus: PoNavbarItem[] = navegaMenusArray

}
