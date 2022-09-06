import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.spinnerService.getSpinnerObserver();
    this.cdref.detectChanges();
  }

}
