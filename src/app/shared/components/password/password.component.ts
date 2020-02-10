import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../core/login/login.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'erste-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  /** Login form */
  inputForm: FormGroup;

  notMatched = false;

  errorMessage = "Confirm Password Mismatch";

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private matBottomSheet: MatBottomSheetRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    });
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      if (this.inputForm.value.password != this.inputForm.value.confirm) {
        this.notMatched = true;
      } else {
        this.notMatched = false;
        let userId = this.loginService.getUser().userId;
        this.matBottomSheet.dismiss();
        event.preventDefault();
        this.userService.changePassword(userId, this.inputForm.value.password).subscribe((res) => {
          this.snackbarService.open("Password Changed Succesfully");
          this.loginService.logout();
          this.router.navigateByUrl('login');
        })
      }
    }
  }

}
