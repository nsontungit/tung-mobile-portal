import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, AfterContentChecked } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit, AfterContentChecked {

  isLoading: boolean;

  constructor(
    private spinnerService: SpinnerService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.spinnerService?.getSpinnerObserver()
      .subscribe(val => {
        this.isLoading = val;
      });
  }
}
