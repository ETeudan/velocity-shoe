import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { MainNavService } from '../main-nav.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css'],
    encapsulation: ViewEncapsulation.None
})

/* Component responsible for plotting the main header of app */
export class HeaderBarComponent implements OnInit {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );
    @Output() buttonToggleClick = new EventEmitter();
    /* title var for the header */
    title: string;

    constructor(private breakpointObserver: BreakpointObserver, private mainNavService: MainNavService) {
    }

    ngOnInit(): void {
        /* subscribe to the MainNavService for getting the title for header */
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

    toggleMenuBar() {
        this.buttonToggleClick.emit();
    }
}
