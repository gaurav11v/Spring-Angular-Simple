import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }
  constructor(private router: Router, private httpClient: HttpClient) {

  }
  signin() {

    this.httpClient.post('http://localhost:8080/Auth/login', this.form.data).subscribe((res: any) => {
      console.log('res => ', res)

      this.form.message = '';
      this.form.inputerror = {};

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      if (!res.success) {
        this.form.inputerror = res.result.inputerror;
      }

      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        this.router.navigateByUrl('welcome')
      }

    })




    // if (this.form.data.loginid == 'admin' && this.form.data.password == 'admin') {
    //   this.route.navigateByUrl('welcome')
    // } else {
    //   this.form.message = 'LoginId and Password Invalid'
    // }

  }
  signUp() {
    this.router.navigateByUrl('signup')
  }
}
