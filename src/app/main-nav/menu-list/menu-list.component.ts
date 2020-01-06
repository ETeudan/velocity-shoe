import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { MainNavService } from '../main-nav.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-menu-list',
    templateUrl: './menu-list.component.html',
    styleUrls: ['./menu-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
/* Component responsive for plotting the menu list of the app */
export class MenuListComponent {

    /* menu items from left menu bar */
    menus: any[] = [{ link: '/products', icon: 'border_all', text: 'Shoes' },
    { link: '/analytics', icon: 'bar_chart', text: 'Analytics' },
    { link: '/#', icon: 'directions_car', text: 'Employees' },
    { link: '/#', icon: 'people_outline', text: 'Customers' },
    { link: '/#', icon: 'map', text: 'Locations' },
    { link: '/#', icon: 'mail_outline', text: 'Chat' },
    { link: '/#', icon: 'settings_applications', text: 'Settings' },
    ];

    constructor() {
    }
}
