import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { Operation } from 'src/app/enums/operations';
import { EditLaptopModalComponent } from '../modals/edit-laptop-modal/edit-laptop-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LaptopService } from 'src/app/services/laptop.service';
import { Laptop } from 'src/app/models/laptop';
import { Paging } from 'src/app/models/common';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-laptop-management-overview',
  templateUrl: './laptop-management-overview.component.html',
  styleUrls: ['./laptop-management-overview.component.css']
})
export class LaptopManagementOverviewComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @ViewChild(MatSort) sort: MatSort;
  // MatPaginator Inputs
  public totalRows: number;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageSize: number = 5;
  public tableDataSource: MatTableDataSource<Laptop>;

  private pagingLaptops: Paging<Laptop>;
  private dialogConfig: MatDialogConfig = {
    height: 'auto',
    width: '70em',
    direction: 'ltr',
    autoFocus: true,
    position: { top: '5%' },
  };
  displayedColumns: string[] = ['name', 'ram', 'rom', 'resolution', 'screenSize', 'price', 'button'];

  constructor(
    private dialog: MatDialog,
    private laptopService: LaptopService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  async ngAfterViewInit() {
    await this.prepareLaptopData();
    this.tableDataSource = new MatTableDataSource(this.pagingLaptops?.data);
    this.tableDataSource.sort = this.sort;
  }

  async ngOnInit(): Promise<void> {
    // await this.prepareLaptopData();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EditLaptopModalComponent, this.dialogConfig);
    dialogRef.componentInstance.operation = Operation.Create;
    dialogRef.componentInstance.title = 'create new laptop';
  }

  openUpdateDialog(id: number): void {
    const laptop = this.getLaptopById(id);
    if (laptop) {
      const dialogRef = this.dialog.open(EditLaptopModalComponent, this.dialogConfig);
      dialogRef.componentInstance.operation = Operation.Update;
      dialogRef.componentInstance.title = 'update laptop';
      dialogRef.componentInstance.laptop = laptop;
    }
  }

  get dataSource(): MatTableDataSource<Laptop> {
    return this.tableDataSource;
  }

  get resultCount(): number {
    return this.tableDataSource?.data?.length;
  }

  private async prepareLaptopData() {
    await Promise.all(
      [
        this.laptopService.getAll(this.pageSize, 0).toPromise(),
      ]
    ).then(values => {
      this.pagingLaptops = values[0];
      this.totalRows = this.pagingLaptops.totalRows;
    });
  }

  public async pageChange(pageEvent: PageEvent) {
    this.pagingLaptops = await this.laptopService.getAll(pageEvent.pageSize, pageEvent.pageIndex).toPromise();
    this.tableDataSource.data = this.pagingLaptops?.data;
  }

  private getLaptopById(id: number): Laptop {
    return this.pagingLaptops?.data?.find(e => e.id == id);
  }

  public sortChange(sortState: Sort) {
    // TODO: show notification for sort
    console.log(`sort by ${sortState.active}`);
  }
}
