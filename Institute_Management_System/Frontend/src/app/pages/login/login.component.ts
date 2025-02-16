import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };


  // registerForm: FormGroup;
  hide = true;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {

    
  }

  ngOnInit(): void {}

  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  onSubmit() {

    console.log('login btn clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect ...ADMIN: admin-dashboard
          //redirect ...NORMAL:normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal user dashbaord
            // window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );


    // if (this.registerForm.valid) {
    //   console.log(this.registerForm.value);
    //   // Implement registration logic here
    // } else {
    //   // Handle form validation errors
    //   this.registerForm.markAllAsTouched();
    // }
  }











  

  // formSubmit() {
  //   console.log('login btn clicked');

  //   if (
  //     this.loginData.username.trim() == '' ||
  //     this.loginData.username == null
  //   ) {
  //     this.snack.open('Username is required !! ', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }

  //   if (
  //     this.loginData.password.trim() == '' ||
  //     this.loginData.password == null
  //   ) {
  //     this.snack.open('Password is required !! ', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }

  //   //request to server to generate token
  //   this.login.generateToken(this.loginData).subscribe(
  //     (data: any) => {
  //       console.log('success');
  //       console.log(data);

  //       //login...
  //       this.login.loginUser(data.token);

  //       this.login.getCurrentUser().subscribe((user: any) => {
  //         this.login.setUser(user);
  //         console.log(user);
  //         //redirect ...ADMIN: admin-dashboard
  //         //redirect ...NORMAL:normal-dashboard
  //         if (this.login.getUserRole() == 'ADMIN') {
  //           //admin dashboard
  //           // window.location.href = '/admin';
  //           this.router.navigate(['admin']);
  //           this.login.loginStatusSubject.next(true);
  //         } else if (this.login.getUserRole() == 'NORMAL') {
  //           //normal user dashbaord
  //           // window.location.href = '/user-dashboard';
  //           this.router.navigate(['user-dashboard/0']);
  //           this.login.loginStatusSubject.next(true);
  //         } else {
  //           this.login.logout();
  //         }
  //       });
  //     },
  //     (error) => {
  //       console.log('Error !');
  //       console.log(error);
  //       this.snack.open('Invalid Details !! Try again', '', {
  //         duration: 3000,
  //       });
  //     }
  //   );
  // }
}
