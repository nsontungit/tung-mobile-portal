import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operation } from 'src/app/enums/operations';

@Component({
  selector: 'app-edit-laptop-modal',
  templateUrl: './edit-laptop-modal.component.html',
  styleUrls: ['./edit-laptop-modal.component.css']
})
export class EditLaptopModalComponent implements OnInit {

  @Input() operation: Operation;

  title: string;
  laptopForm : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.laptopForm = formBuilder.group({
      name: [null, [Validators.required]],
      ram: [null, [Validators.required]],
      rom: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  ngOnInit(): void { 
    if (this.operation == Operation.Create) {
      this.title = 'create new laptop';    
    }
  }

  getErrorMessage(name: string) {
    if (this.laptopForm.get(name).hasError('required')) {
      return 'You must enter value';
    }
  }

  onSubmit() {
    console.log('submitted');
    if (this.laptopForm.valid)
      console.log(this.laptopForm.value);
    
  }

}
