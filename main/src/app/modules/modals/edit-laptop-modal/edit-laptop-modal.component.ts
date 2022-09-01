import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Operation } from 'src/app/enums/operations';
import { Laptop } from 'src/app/models/laptop';
import { ErrorMessageService } from 'src/app/services/error-message';
import { LaptopService } from 'src/app/services/laptop.service';

@Component({
  selector: 'app-edit-laptop-modal',
  templateUrl: './edit-laptop-modal.component.html',
  styleUrls: ['./edit-laptop-modal.component.css']
})
export class EditLaptopModalComponent implements OnInit {

  @Input() operation: Operation;
  @Input() title: string = '';
  @Input() laptop: Laptop = null;

  laptopForm: FormGroup;
  isCloseDialog: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EditLaptopModalComponent>,
    private formBuilder: FormBuilder,
    private laptopService: LaptopService,
    private errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.makeForm();
  }

  makeForm() {
    if (this.laptop != null) {
      this.laptopForm = this.formBuilder.group({
        name: [this.laptop.name, [Validators.required]],
        ram: [this.laptop.ram, [Validators.min(4), Validators.max(256)]],
        rom: [this.laptop.rom, [Validators.min(128), Validators.max(2048)]],
        price: [this.laptop.price, [Validators.min(0)]],
        screenSize: [this.laptop.screenSize, [Validators.min(0)]],
        resolution: [this.laptop.resolution],
        brand: [this.laptop.brand],
      });
    }
    else {
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

  }

  getErrorMessage(name: string): string {
    const msg = this.errorMessageService.getErrorMsg(this.laptopForm.get(name));
    return msg == null ? null : msg[0];
  }

  async onSubmit() {
    if (this.laptopForm.valid) {
      await this.laptopService.createOne(this.laptopForm.value).toPromise();
      this.dialogRef.close();
    }
  }

}
