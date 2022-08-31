import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Operation } from 'src/app/enums/operations';
import { LaptopService } from 'src/app/services/laptop.service';

@Component({
  selector: 'app-edit-laptop-modal',
  templateUrl: './edit-laptop-modal.component.html',
  styleUrls: ['./edit-laptop-modal.component.css']
})
export class EditLaptopModalComponent implements OnInit {

  @Input() operation: Operation;

  title: string;
  laptopForm : FormGroup;
  isCloseDialog: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EditLaptopModalComponent>,
    private formBuilder: FormBuilder,
    private laptopService: LaptopService
  ) {}

  ngOnInit(): void { 
    if (this.operation == Operation.Create) {
      this.title = 'create new laptop';    
    }
    this.makeForm();
  }

  makeForm() {
    this.laptopForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      ram: [null, [Validators.min(4), Validators.max(256)]],
      rom: [null, [Validators.min(128), Validators.max(2048)]],
      price: [null, [Validators.min(0)]],
      screenSize: [null, [Validators.min(0)]],
      resolution: [null],
      brand: [null],
    });
  }

  getErrorMessage(name: string) {
    if (this.laptopForm.get(name).hasError('required')) {
      return 'You must enter value';
    }
  }

  async onSubmit() {
    if (this.laptopForm.valid) {
      console.log(this.laptopForm.value);
      await this.laptopService.createOne(this.laptopForm.value).toPromise();
      this.dialogRef.close();
    }
  }

}
