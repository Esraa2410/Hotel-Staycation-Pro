import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators  ,ReactiveFormsModule, AbstractControl} from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { IRegister } from '../../model/IRegister.model';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SharedModule } from 'src/app/shared/shared.module';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,RouterLink , NgxFileDropModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registeredUser! :IRegister;
  public files: NgxFileDropEntry[] = [];

    userProfileImg! :File;
    imgUrl:string='';
    isImageUploade:boolean=false

    userRole="user"

    hidePassword:boolean=true;
    hideConfirmPassword:boolean = true;


    registerForm:FormGroup=new FormGroup({
      userName : new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]) ,// the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 6 characters long.
      confirmPassword:new FormControl('',[RxwebValidators.compare({fieldName:'password'}),Validators.required]),
      phoneNumber: new FormControl('',[Validators.required ,Validators.pattern(/^01[0-2,5]\d{8}$/)]),
      country: new FormControl('',[Validators.required]),
      profileImage:new FormControl(''),
      role:new FormControl(''),
    },

  {
    validators:this.passwordMatchValidator,
  }
  )

    constructor(private _AuthService:AuthService,
      private _Router:Router,
      private _ToastrService: ToastrService,
      private translate: TranslateService
    ){}


    register(userData:FormGroup):void{
     //as we need to send image
     let newUserData = new FormData();

     newUserData.append('userName', userData.value.userName);
     newUserData.append('email', userData.value.email);
     newUserData.append('country', userData.value.country);
     newUserData.append('phoneNumber', userData.value.phoneNumber);
     newUserData.append('profileImage' ,this.userProfileImg,this.userProfileImg.name);
     newUserData.append('role' , this.userRole);
     newUserData.append('password', userData.value.password);
     newUserData.append('confirmPassword', userData.value.confirmPassword);
      if(userData.valid&&this.isImageUploade){

      this._AuthService.register(newUserData).subscribe({
        error:(err:HttpErrorResponse)=>{
          this.showErrorToaster(err.error.message)
        },
        complete:()=>{
      this.showSuccessToaster('account-register-success')
      this._Router.navigate(['/auth/login'])
        }
      })
    }
    }
    passwordMatchValidator(control:AbstractControl){
      return control.get('password')?.value === control.get('confirmPassword')?.value ? null :
      {mismatch:true};
        }

        public dropped(files: NgxFileDropEntry[]) {
        const  droppedFile = files[0];
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
              const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
              fileEntry.file((file: File) => {
                // Here you can access the real file
                console.log(droppedFile.relativePath, file);
                this.imgUrl= URL.createObjectURL(file)
                this.userProfileImg= file;
                this.isImageUploade=true

              });
            }

        }

        public fileOver(event:any){
          // console.log(event);
        }

        public fileLeave(event:any){
          // console.log(event);
        }

        showSuccessToaster(toastEnAr:string) {
          this.translate.get('toaster.'+toastEnAr).subscribe((res: string) => {
            this._ToastrService.success(res);
          });
        }

        showErrorToaster(toastEnAr:string) {
          this.translate.get('toaster.'+toastEnAr).subscribe((res: string) => {
            this._ToastrService.error(res);
          });
        }

}
