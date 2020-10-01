import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-try-again-modal',
  templateUrl: './try-again-modal.component.html',
  styleUrls: ['./try-again-modal.component.css']
})
export class TryAgainModalComponent implements OnInit {
  @Input() openModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmButton: EventEmitter<any> = new EventEmitter<any>();
  openModalSubscription: Subscription;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openModalSubscription = this.openModal.subscribe(() => {
      this.openDialog();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TryAgainModalContentComponent, {
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.confirmButton.emit();
    });
  } 


  ngOnDestroy() {
    this.openModalSubscription.unsubscribe();
  }

}

@Component({
  selector: 'app-try-again-modal-content',
  templateUrl: './try-again-modal-content.component.html',
  styleUrls: ['./try-again-modal.component.css']
})
export class TryAgainModalContentComponent {

  constructor(public dialogRef: MatDialogRef<TryAgainModalContentComponent>) { }

  okButtonClick() {
    this.dialogRef.close();
  }

}