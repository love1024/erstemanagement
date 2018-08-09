import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/login/login.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'erste-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('smoothInOut', [
      state('in', style({ 'opacity': '1', 'transform': 'translateY(0)' })),
      transition('void => *', [
        style({ 'opacity': '0', 'transform': 'translateY(50px)' }),
        animate(400)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  /** Login form */
  inputForm: FormGroup;

  /** Login fail message */
  loginFailed = false;

  /** Error message */
  errorMessage = "Username and Password mismatch";

  /**
   * Creates an instance of LoginComponent.
   * @param {LoginService} loginService 
   * @param {Router} router 
   * @param {FormBuilder} formBuilder 
   * @memberof LoginComponent
   */
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  /**
   * Create login form
   * 
   * @memberof LoginComponent
   */
  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.emitLogInOut();
      this.router.navigateByUrl("/project");
    }
    this.createForm();
  }

  /**
   * Create login form
   * 
   * @memberof LoginComponent
   */
  createForm(): void {
    this.inputForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * On submit of login form
   * 
   * @param {boolean} isValid 
   * @memberof LoginComponent
   */
  onSubmit(isValid: boolean) {
    this.loginFailed = false;
    if (isValid) {
      this.loginService.login(this.inputForm.value).subscribe((res) => {

        //If result is ok move to /home route else show login fail message
        if (res["type"] == "ok") {
          this.loginService.emitLogInOut();
          this.router.navigateByUrl("/department");
        } else {
          this.loginFailed = true;
        }
      })
    }
  }

}
