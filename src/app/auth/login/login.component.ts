import { Component, OnInit, OnDestroy } from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from '../../../../node_modules/rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  loadingSups: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSups = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.email, Validators.required]}),
      password: new FormControl('', {validators:[Validators.required]})
    })
  }
  onSubmit(){
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }
  ngOnDestroy(){
    this.loadingSups.unsubscribe();
  }
}
