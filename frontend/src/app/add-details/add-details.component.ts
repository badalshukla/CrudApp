import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, } from '@angular/forms';
import { ApiService } from '../sevices/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {
  public file: string = '';
  detailsForm!:FormGroup;
  actionBtn:string="save"
  constructor(private formBuilder:FormBuilder,
     private api:ApiService,
     @Inject(MAT_DIALOG_DATA)public editData:any,
     private dailogref:MatDialogRef<AddDetailsComponent>) { }

  ngOnInit(): void {
    this.detailsForm=this.formBuilder.group({
      name:[null,[Validators.required,Validators.minLength(2)]],
      gender:[null,[Validators.required]],
      date:[null,[Validators.required]],
      mobile:[null,[Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
      email:[null,[Validators.required,Validators.email]],
      city:[null,[Validators.required,Validators.minLength(3)]],
      image:[null,[Validators.required]]
    })
    if(this.editData){
      this.actionBtn="update";
      this.detailsForm.controls['name'].setValue(this.editData.name);
      this.detailsForm.controls['gender'].setValue(this.editData.gender);
      this.detailsForm.controls['date'].setValue(this.editData.date);
      this.detailsForm.controls['mobile'].setValue(this.editData.mobile);
      this.detailsForm.controls['email'].setValue(this.editData.email);
      this.detailsForm.controls['city'].setValue(this.editData.city);
      this.detailsForm.controls['image'].setValue(this.editData.city);
    }
    
  }

  onFileChange($event:any) {
    console.log("================================ashish========")
    this.file = $event.target.files[0]; // <--- File Object for future use.
    let file = $event.target.files[0]; // <--- File Object for future use.
    this.detailsForm.controls['image'].setValue(file ? file.name : ''); // <-- Set Value for Validation
}

  addDetails(){
    if(!this.editData){
      if(this.detailsForm.valid){
        this.api.postDetails(this.detailsForm.value).subscribe({
          next:(res)=>{
            alert("Details Added Successfully 👌");
            this.detailsForm.reset();
            this.dailogref.close();
          },
          error:()=>{
          alert("there is error");
          }
        })
      }
    }else{
      this.updateDetails();
    }
    
  };
  updateDetails(){
    this.api.putDetails(this.detailsForm.value,this.editData.id).subscribe({next:(res)=>{
          alert("Details Updated 👌");
          this.detailsForm.reset();
          this.dailogref.close('update');
      },
error:()=>{
  alert("Error while Putting Data From Api")
}
  })
}
  

}