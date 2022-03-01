import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../sevices/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddDetailsComponent } from '../add-details/add-details.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public popoverTitle:string='popoverTitle';
  public popoverMessage:string='popoverDescription';
  public confirmClicked:boolean=false;
  public cancelClicked:boolean=false;
  displayedColumns: string[] = ['name', 'gender', 'date', 'mobile','email','city','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private api:ApiService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllDetails();
    this.popoverTitle="Are You Sure ";
    this.popoverMessage="Deleted Successfully";
    
  }
  getAllDetails(){
    this.api.getDetails().subscribe({next:(res)=>{
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort=this.sort;

    },
    error:(err)=>{
      alert("error");
      
    }
  })
  }
  editDetails(row:any){
    this.dialog.open(AddDetailsComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val=='update'){
        this.getAllDetails()
      }
    })
  }
 deleteDetails(id:number){
   this.api.deleteDetails(id).subscribe({next:(res)=>{
   
     this.getAllDetails();
   },
   error:()=>{
      alert("Eroor Occured😮")
   }
  })
 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
