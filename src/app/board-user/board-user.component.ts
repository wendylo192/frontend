import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TvshowService } from '../_services/tvshow.service';
import { Show } from '../_interfaces/show.interface';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { timer } from 'rxjs';
declare var $: JQueryStatic;

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  form: FormGroup;
  searchControl: FormControl;
  content = '';
  shows: Show[] = [];
  searchKeyword: string;
  isSearching: boolean;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  private debounce: number = 400;

  constructor(private tvshowService: TvshowService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.tvshowService.getShows().subscribe(shows => {
      this.shows = shows;
    });

    this.searchControl = new FormControl('');
    this.searchByKeyword();
    let timer$ = timer(2000, 1000);
    timer$.subscribe(() => this.searchByKeyword());

    this.form = this.formBuilder.group({
      searchKeyword: this.searchControl
    });
  }

  loadOption(tvshow: Show) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: tvshow
      }
    };

    this.router.navigate(['admin', tvshow.name], navigationExtras);
  }

  searchByKeyword() {
    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.tvshowService.getShowsByKeyword(query).subscribe(shows => {
          this.shows = shows
          this.isSearching = true;
          console.log('searching')
          console.log(query)
          console.log(this.shows)
        })
      });
  }
}
