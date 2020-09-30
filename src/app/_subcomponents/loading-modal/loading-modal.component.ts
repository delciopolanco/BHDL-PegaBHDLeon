import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent implements OnInit {

  @Input() openModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() closeModal: EventEmitter<any> = new EventEmitter<any>();
  openModalSubscription: Subscription;
  closeModalSuscription: Subscription;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openModalSubscription = this.openModal.subscribe(() => {
      this.openDialog();
    });

    this.closeModalSuscription = this.closeModal.subscribe(() => {
      this.dialog.closeAll();
    })
  }

  openDialog(): void {
    this.dialog.open(ModalContentComponent, {
      width: '90%'
    });
  }



  ngOnDestroy() {
    this.openModalSubscription.unsubscribe();
    this.closeModalSuscription.unsubscribe();
  }

}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class ModalContentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalContentComponent>) { }

  ngOnInit(): void {
  }

}
