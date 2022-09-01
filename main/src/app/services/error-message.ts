import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorMessageService {

    constructor() { }

    public getErrorMsg(control: AbstractControl): string[] | null {
        if (!this.hasError(control))
            return null;
        let errors = control.errors;
        return Object.keys(errors).map(anyError => this.predictError(anyError, errors[anyError]));
    }

    private hasError(control: AbstractControl) {
        return control.errors && (control.dirty || control.touched);
    }

    private predictError(errorName: string, errorObj: object): string {
        let errorMsg: string = '';
        switch (errorName) {
            case 'required':
                errorMsg = `Cannot be blank`;
                break;
            case 'min':
                errorMsg = `Should not be more than ${errorObj['min']}`;
                break;
            default:
                errorMsg = 'Invalid';
                break;
        }
        return errorMsg;
    }
}
