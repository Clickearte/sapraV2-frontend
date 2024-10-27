import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataService, ToasterService, routes } from 'src/app/core/core.index';
import {
  apiResultFormat,
  category,
  pageSelection,
} from 'src/app/core/models/models';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  public tableData: Array<category> = [];

  isCollapsed = false;
  public searchDataValue = '';
  public Toggledata = false;
  public routes = routes;

  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;

  dataSource!: MatTableDataSource<category>;

  // pagination variables end

  addNewStatus = false;
  constructor(
    private data: DataService,
    private toast: ToasterService,
    private pagination: PaginationService,
    private router: Router,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.categories) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  service = ['Valve profit'];
  services = ['Sales'];

  private getTableData(pageOption: pageSelection): void {
    this.data.getCategories().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: category, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<category>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableData2: [],
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  addCategory(): void {
    this.toast.typeSuccess('Category added successfully  :)', 'Completed');
  }
  editCategory(): void {
    this.toast.typeSuccess('Category edited successfully  :)', 'Completed');
  }
  isCollapsed1 = false;
  isCollapsed2 = false;

  users = [
    { name: 'Barbara Moore', checked: false },
    { name: 'Hendry Evan', checked: false },
    { name: 'Richard Miles', checked: false },
  ];
  users2 = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false },
  ];

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}