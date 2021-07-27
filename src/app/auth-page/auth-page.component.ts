import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  isRegistered: boolean = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams
    if (queryParams['signup'] !== undefined) {
      this.isRegistered = false
    }
    console.log(this.route.snapshot.queryParams['signup'])
    console.log(this.isRegistered)
  }

  submitForm(formData: NgForm) {
    const {email, password} = formData.value
    console.log(formData.value)
    formData.reset()
    this.authService.login(email, password)
  }


  switchMode() {
    this.isRegistered = !this.isRegistered

    let params: Params = {}

    if (this.isRegistered) {
      params = { login: '' }
    }
    else {
      params = { signup: '' }
    }
    console.log(params)

    this.router.navigate([], {
      queryParams: params,
      relativeTo: this.route,
      replaceUrl: true
    })
  }

}
