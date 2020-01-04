import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MainNavService } from './main-nav.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MainNavComponent implements OnInit {
    
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    title: string;
    menus: any[] = [{ link: '/products', icon: 'border_all', text: 'Shoes' },
                    { link: '/analytics', icon: 'bar_chart', text: 'Analytics' },
                    { link: '/#', icon: 'directions_car', text: 'Employees' },
                    { link: '/#', icon: 'people_outline', text: 'Customers' },
                    { link: '/#', icon: 'map', text: 'Locations' },
                    { link: '/#', icon: 'mail_outline', text: 'Chat' },
                    { link: '/#', icon: 'settings_applications', text: 'Settings' },
                   ]

    constructor(private breakpointObserver: BreakpointObserver, private mainNavService: MainNavService) {
    }

    ngOnInit(): void {
        this.mainNavService.getTitle()
            .subscribe(
                (title: string) => {
                    this.title = title;
                },
                err => {
                    console.log(err);
                }
            );
    }
}
