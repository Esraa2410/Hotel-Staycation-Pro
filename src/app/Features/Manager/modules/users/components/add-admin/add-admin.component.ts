import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxFileDropEntry} from 'ngx-file-drop';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];

  userProfileImg!: File;
  imgUrl: string = '';
  isImageUploade: boolean = false

  userRole = "user"

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  constructor(private _UsersService: UsersService, private _Router: Router,
    private toastr: ToastrService) { }
  ngOnInit(): void {

  }

  addAdminForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, RxwebValidators.compare({ fieldName: 'password' })]),
    phoneNumber: new FormControl(null, [Validators.required,Validators.pattern(/^01[0-2,5]\d{8}$/)]),
    country: new FormControl(null, [Validators.required]),
    role: new FormControl('admin'),
    profileImage: new FormControl(null )
  })


  onAddAdmin(userData: FormGroup) {
    let newUserData = new FormData();

    newUserData.append('userName', userData.value.userName);
    newUserData.append('email', userData.value.email);
    newUserData.append('password', userData.value.password);
    newUserData.append('confirmPassword', userData.value.confirmPassword);
    newUserData.append('phoneNumber', userData.value.phoneNumber);
    newUserData.append('country', userData.value.country);
    newUserData.append('role', 'admin');
    newUserData.append('profileImage' ,this.userProfileImg,this.userProfileImg.name);

    if (userData.valid&&this.isImageUploade) {
      this._UsersService.addAdmin(newUserData).subscribe({
       error: (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message);
        }, complete: () => {
          this.toastr.success('Add New Admin Completed Sucessfully');
          this._Router.navigate(['/manager/users'])

        }
      })
    }
  }


  public dropped(files: NgxFileDropEntry[]) {
    const droppedFile = files[0];
    // Is it a file?
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        // Here you can access the real file
        this.imgUrl = URL.createObjectURL(file)
        this.userProfileImg = file;
        this.isImageUploade = true
      });
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
