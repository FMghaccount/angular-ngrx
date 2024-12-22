import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngrx-products';
  private destroyRef = inject(DestroyRef);

  private _store = inject(Store);

  ngOnInit() {
    this._store.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      console.log(res);
    });
  }
}
