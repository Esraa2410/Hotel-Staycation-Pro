import { HttpErrorResponse } from '@angular/common/http';
import { IUpdateCommentResponse ,IUpdateCommentRequest ,IUpdateCommentDataComment,IUpdateCommentData} from './../../../../models/room-details';
import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomDetailsService } from 'src/app/Features/guest/services/room-details.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-up-date-comment',
  templateUrl: './up-date-comment.component.html',
  styleUrls: ['./up-date-comment.component.scss']
})
export class UpDateCommentComponent {
  reqData:IUpdateCommentRequest={
    comment:'test  website'
  }

  commentDtails:IUpdateCommentDataComment ={
    _id: '',
    room: '',
    user: '',
    comment: '',
    createdAt: '',
    updatedAt: '',
  }

  commentData:IUpdateCommentData= {
    comment: this.commentDtails
  }

  response:IUpdateCommentResponse= {
    success: false,
    message: '',
    data: this.commentData
  }

  oldComment:string='';

  constructor(private _ToastrService:ToastrService, private _RoomDetailsService:RoomDetailsService,
    public dialogRef: MatDialogRef<UpDateCommentComponent>, @Inject(MAT_DIALOG_DATA) public data: { id: string , comment:string }) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  updateCommentForm:FormGroup=new FormGroup({
    comment:new FormControl(this.data.comment ,[Validators.required])
  })


  onUpdateComment(id:string , data:FormGroup){
    this._RoomDetailsService.updateComment(id,data.value).subscribe({
      next:(res:IUpdateCommentResponse)=>{
        this.response=res;
       // console.log(res);
      },
      error:(err:HttpErrorResponse)=>{
        this._ToastrService.error(err.error.message);
       // console.log(err);
      },complete:()=>{
        this.onNoClick();
        this._ToastrService.success(this.response.message);
      }
    })


  }

}
