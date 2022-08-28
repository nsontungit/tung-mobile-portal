import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Operation } from 'src/app/enums/operations';
import { EditLaptopModalComponent } from '../modals/edit-laptop-modal/edit-laptop-modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LaptopService } from 'src/app/services/laptop.service';
import { Laptop } from 'src/app/models/laptop';

@Component({
  selector: 'app-laptop-management-overview',
  templateUrl: './laptop-management-overview.component.html',
  styleUrls: ['./laptop-management-overview.component.css']
})
export class LaptopManagementOverviewComponent implements OnInit {

  private laptop: Laptop;

  constructor(private dialog: MatDialog, private laptopService: LaptopService) { }

  async ngOnInit(): Promise<void> {
    await this.getLaptop();
  }

  open() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.width = '70em';
    dialogConfig.direction = 'ltr';
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };

    const dialogRef = this.dialog.open(EditLaptopModalComponent, dialogConfig);
    dialogRef.componentInstance.operation = Operation.Create;
    dialogRef.afterOpened().subscribe(result => {
      console.log(result);
    });
  }

  async getLaptop() {
    this.laptop = await this.laptopService.getOne().toPromise();
    console.log(this.laptop);
  }

}
