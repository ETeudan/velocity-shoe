import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Injectable()
export class MainNavService {
    private title: BehaviorSubject<string> = new BehaviorSubject(null);
    constructor() {
    }

    getTitle(): Observable<string> {
        return this.title;
    }

    setTitle(titleValue: string): void {
        this.title.next(titleValue);
    }
}
