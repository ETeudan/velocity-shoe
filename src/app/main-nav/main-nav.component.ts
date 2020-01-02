import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MainNavService } from './main-nav.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

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

    constructor(private breakpointObserver: BreakpointObserver, private mainNavService: MainNavService,
        iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        this.initializeMatIcons(iconRegistry, sanitizer);
    }

    ngOnInit(): void {
        this.mainNavService.getTitle()
            .subscribe(
                (title : string) => {
                    this.title = title;
                },
                err => {
                    console.log(err);
                }
            );
    }

    initializeMatIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'mail_outline',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mail_outline-24px.svg'));
        iconRegistry.addSvgIcon(
            'notifications_none',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/notifications_none-24px.svg'));
        iconRegistry.addSvgIcon(
            'border_all',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/border_all-24px.svg'));
        iconRegistry.addSvgIcon(
            'bar_chart',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bar_chart-24px.svg'));
        iconRegistry.addSvgIcon(
            'directions_car',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/directions_car-24px.svg'));
        iconRegistry.addSvgIcon(
            'people_outline',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/people_outline-24px.svg'));
        iconRegistry.addSvgIcon(
            'map',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/map-24px.svg'));
        iconRegistry.addSvgIcon(
            'settings_applications',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings_applications-24px.svg'));
        iconRegistry.addSvgIcon(
            'menu',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu-24px.svg'));
    }
}
