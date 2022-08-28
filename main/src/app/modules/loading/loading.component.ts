import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading$ : Observable<boolean>;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.isLoading$ = this.spinnerService.getSpinnerObserver();
  }

}
