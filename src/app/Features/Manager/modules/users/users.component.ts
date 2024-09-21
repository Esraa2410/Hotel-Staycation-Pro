import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IGetAllUsersRequest, IUser, IGetAllUsersData, IGetAllUsersResponse } from './models/users';
import { UsersService } from './services/users.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  btnText: string = 'Add new admin';
  headerText: string = 'Users Table Details';
  headerPargraph: string = 'You can check all details';
  search!: string;
  pageSize = 10;
  pageIndex = 0;
  totalCount!: number;
  displayedColumns: string[] = ['Username', 'Email'
    , 'Phone number', 'Role', 'Created at', 'Actions'];


  parm: IGetAllUsersRequest = {
    page: this.pageIndex,
    size: this.pageSize
  }

  users: IUser[] = []
  sortedUsers: IUser[] = [];


  constructor(private _Router: Router, private _UsersService: UsersService) { }
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this._UsersService.getAllUsers(this.parm).subscribe({
      next: (res: IGetAllUsersResponse) => {
        this.users = res.data.users;
        this.sortedUsers = this.users.slice();
        this.totalCount = res.data.totalCount;
      }
    })
  }

  //for paginaton
  changePage(e: PageEvent) {
    this.parm.page = e.pageIndex + 1;
    this.parm.size = e.pageSize;
    this.getAllUsers();
  }

  resetSearcgInput() {
    this.search = '';
    this.getAllUsers();
  }

  filtetByUserName(searchValue: HTMLInputElement) {
    if (searchValue) {
      this.sortedUsers = this.sortedUsers.filter(p => p.userName.includes(searchValue.value));
      this.totalCount = this.sortedUsers.length
    }
  }

  addAdmin() {
    this._Router.navigate(['/manager/users/addAdmin']);
  }

  veiwItem(id: string) {
    this._Router.navigate(['/manager/profile', id, 'viewUser']);
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }
    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdAt':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
