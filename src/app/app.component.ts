import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        this.initializeMatIcons(iconRegistry, sanitizer);
    }

    /* initialize mat-icons */
    initializeMatIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        /* icon needs for ProductListComponent */
        iconRegistry.addSvgIcon(
            'keyboard_arrow_down',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/keyboard_arrow_down-24px.svg'));
        /* icons need for MainNavComponent */
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
        /* icons need for LoginComponent */
        iconRegistry.addSvgIcon(
            'visibility',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility-24px.svg'));
        iconRegistry.addSvgIcon(
            'visibility_off',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility_off-24px.svg'));
    }
}
