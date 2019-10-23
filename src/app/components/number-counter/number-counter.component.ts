import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { tap, switchMap, bufferCount, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-number-counter',
  templateUrl: './number-counter.component.html',
  styleUrls: ['./number-counter.component.scss']
})
export class NumberCounterComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();

  private myNumber$: Subject<number> = new Subject<number>();

  constructor() { }

  ngOnInit() {
    this.getNumber()
      .pipe(bufferCount(4))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((numberArr: number[]) => console.log(numberArr));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Get random numbers
   */
  getNumber(): Observable<number> {
    return interval(500)
      .pipe(
        tap(() => this.myNumber$.next(Math.floor( Math.random() * 10))),
        switchMap(value => this.myNumber$)
      );
  }
}
