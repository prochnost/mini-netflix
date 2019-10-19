import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ExceptionsService {

  constructor(private snackBar: MatSnackBar) { }

  requestError() {
    this.snackBar.open(
      'An error occured while processing your request!',
      undefined,
      { duration: 5000, panelClass: ['alert', 'alert-danger', 'bg-danger'] }
    );
  }

}
