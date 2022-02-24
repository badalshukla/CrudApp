import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ApiService } from './sevices/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crudoperationfull';
  displayedColumns: string[] = ['name', 'gender', 'date', 'mobile','email','city','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api:ApiService) {}
  ngOnInit(): void {
      
  }
  openDialog() {
    this.dialog.open(AddDetailsComponent, {
      width:'30%'
    })
  }
}
