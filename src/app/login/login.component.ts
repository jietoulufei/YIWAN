import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  datasource$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  /**
   * 登入
   */
  submitForm(): void {
    console.log(this.validateForm.value);
    console.log(this.validateForm);
    //登入请求  
    // "startProxy": "ng serve --proxy-config proxy.conf.json", 启动代理接口 8080 
    // node服务端localhost：8080 重定向 localhost:4200
    this.datasource$ = this.http.get("/api/demo");

    this.datasource$.subscribe(
      data=>{
        console.log(data);
        
      }
    );
    

    if (this.validateForm.status == "VALID") { //VALID 有效
      this.router.navigate(['/indexPage']);
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
