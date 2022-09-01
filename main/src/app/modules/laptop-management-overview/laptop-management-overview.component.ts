import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Operation } from 'src/app/enums/operations';
import { EditLaptopModalComponent } from '../modals/edit-laptop-modal/edit-laptop-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LaptopService } from 'src/app/services/laptop.service';
import { Laptop } from 'src/app/models/laptop';

@Component({
  selector: 'app-laptop-management-overview',
  templateUrl: './laptop-management-overview.component.html',
  styleUrls: ['./laptop-management-overview.component.css']
})
export class LaptopManagementOverviewComponent implements OnInit {

  private laptops: Laptop[] = [];
  private dialogConfig: MatDialogConfig = {
    height: 'auto',
    width: '70em',
    direction: 'ltr',
    autoFocus: true,
    position: { top: '5%' }
  };
  displayedColumns: string[] = ['name', 'ram', 'rom', 'resolution', 'screenSize', 'price', 'button'];

  constructor(private dialog: MatDialog, private laptopService: LaptopService) { }

  async ngOnInit(): Promise<void> {
    await this.getLaptops();
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

  get dataSource(): Laptop[] {
    return this.laptops;
  }

  private async getLaptops() {
    this.laptops = await this.laptopService.getAll().toPromise();
    console.log(this.laptops);
  }

  private getLaptopById(id: number): Laptop {
    return this.laptops.find(e => e.id == id);
  }

}
