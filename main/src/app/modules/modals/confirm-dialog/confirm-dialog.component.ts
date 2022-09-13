import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {}

  confirm() {
    this.dialogRef.close(true);
  }

  dismiss() {
    this.dialogRef.close(false);
  }

}
