import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../_interfaces/user.interface';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
declare var $:JQueryStatic;

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users: User[];
  message: string;

  @ViewChild(DataTableDirective, {static: true})
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.users = JSON.parse(JSON.stringify(data));
      },
      err => {
        this.message = JSON.parse(err.error).message;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;

        // For checked fields
        $('input[type=checkbox]', this.footer()).on('checked change', function () {
          if (this['value'] === 'true') {
            that.search(this['value']).draw();
          } else {
            that.search('').draw();
          }
        });

        $('input[type=text]', this.footer()).on('keyup change', function () {
          console.log("text : " + this['value']);
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
          }
        });
      });
    });
  }

  loadOption(user: User) {    
    const navigationExtras: NavigationExtras = {
      state: {
        data: user
      }
    };

    this.router.navigate(['admin', user.id], navigationExtras);
  }
}
