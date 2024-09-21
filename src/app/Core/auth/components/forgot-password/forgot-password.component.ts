import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IForgot } from '../../model/IForgot';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink, SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgetRespnse:IForgot={
    success:false,
    message:'',
    data:null
  }

  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,
    private _Router: Router, private toastr: ToastrService,
    private translate: TranslateService
  ){}
  fogetForm:FormGroup = this._FormBuilder.group({
    email:['',[Validators.email,Validators.required]]
  })

  handleForget(){
    this._AuthService.forgetPass(this.fogetForm.value).subscribe({
      next:res=>{
        console.log(res);
        this.forgetRespnse=res
      },
      error:err=>{
        this.showError(err.error.message)

      },complete:()=>{
        // this.toastr.success('Please check your email')
        this.showSuccessToaster('check-mail')
        this._Router.navigate(['/auth/reset']);

      }
    })
  }

  showError(mes:string) {
    this.toastr.error( mes);
  }


  showSuccessToaster(toastEnAr:string) {
    this.translate.get('toaster.'+toastEnAr).subscribe((res: string) => {
      this.toastr.success(res);
    });
  }
}
