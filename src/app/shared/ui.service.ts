import { Subject } from 'rxjs';
import { Injectable } from '../../../node_modules/@angular/core';
import { MatSnackBar } from '../../../node_modules/@angular/material';

@Injectable()
export class UIService {

    constructor(private snackbar: MatSnackBar){

    }
    loadingStateChanged = new Subject<boolean>();
    showSnackbar(message, action, duration){
        this.snackbar.open(message, action, duration);
    }
}