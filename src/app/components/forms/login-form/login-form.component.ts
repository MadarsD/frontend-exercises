import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDetails} from "../../../shared/models/login.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public siteKey:any;

  @Input()
  exampleValue?: string;
  gender:string | undefined;

  @Output() loginEvent = new EventEmitter<LoginDetails>();

  loginForm = new FormGroup({});
  countries = [
    {
      title: 'Latvia',
      countryCode: 'LV'
    },
    {
      title: 'Estonia',
      countryCode: 'EE'
    },
    {
      title: 'Lithuania',
      countryCode: 'LT'
    },
  ];

  constructor(private fb: FormBuilder) { }

  //Nostrādā 1 reizi pie lapas ielādes
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      subscribe: [true],
      country: [''],
      recaptcha: ['', Validators.required]
    });
    this.siteKey = "6LcJoKYfAAAAAPURr7qhk4CBHy-qKZor3qGel_8t";
  }

  login(): void {
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid) {
      //Sūtu datus
      this.loginEvent.emit(this.loginForm.value)
    }
  }
}
