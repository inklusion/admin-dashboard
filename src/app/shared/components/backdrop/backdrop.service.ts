import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BackdropService {
    status = new BehaviorSubject<boolean>(false);

    public get backdropStatus(): Observable<boolean> {
        return this.status.asObservable();
    }

    public showBackdrop(): void {
        this.status.next(true)
    }

    public hideBackdrop(): void {
        this.status.next(false);
    }

}