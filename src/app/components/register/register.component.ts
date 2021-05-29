import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.creatRegisterForm();
  }

  creatRegisterForm()
  {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

  }

  register() {
    if (this.registerForm.valid) {
      if(this.registerForm.value['password'] != this.registerForm.value['confirmPassword']) {
        this.toastrService.error('şifreler aynı değil!');
        return;
      }
      let registerForm = Object.assign({}, this.registerForm.value);
      this.authService.register(registerForm).subscribe(
        (response) => {
          this.router.navigate(['login']);
          this.toastrService.success('Kayıt olundu !');
        },responseError => {
         this.toastrService.error("kayıt olunamadı !");
        }
      );
    } else {
      this.toastrService.info('lütfen tüm alanları doldurunuz !');
    }
  }






}
