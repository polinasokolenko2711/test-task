import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, fromEvent, merge, of, timer, Subject} from 'rxjs';
import { mapTo, filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();

  isUserLoggedIn$: Observable<boolean>;
  private defaultInterval = 2000;
  private windowOnline$: Observable<Event> = fromEvent(window, 'online');
  private windowOffline$: Observable<Event> = fromEvent(window, 'offline');
  private timer$: Observable<number> = timer(0, this.defaultInterval);

  constructor() {}

  ngOnInit() {
    this.isUserLoggedIn$ = this.getOnlineStatus();
    this.startPolling()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => console.log('online'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Getting current online status
   */
  getOnlineStatus(): Observable<boolean> {
    return merge(
      this.windowOffline$.pipe(mapTo(false)),
      this.windowOnline$.pipe(mapTo(true)),
      of(navigator.onLine),
    );
  }

  /**
   * Handling change online status
   */
  startPolling(): Observable<boolean> {
    return this.timer$.pipe(
      switchMap(() => this.getOnlineStatus()),
      filter((isOnline: boolean) => isOnline)
    );
  }
}
