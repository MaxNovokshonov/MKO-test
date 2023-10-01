import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Message } from '../../common/interfaces/message';
import { ActivatedRoute, Params } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  message: Message;

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private _modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.route.params
        .pipe(
          switchMap((params: Params) => {
            this.messagesService.activeMessage.next(params['id']);
            return this.messagesService.getMessageById(params['id']);
          }),
        )
        .subscribe((value) => {
          this.message = value;
        });
    }
  }

  editMessage() {
    const modalRef = this._modalService.open(EditModalComponent);
    modalRef.componentInstance.fromParents = this.message;
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.messagesService.editMessage(result.id, result).subscribe((value) => {
          this.messagesService.isMessageEdit.next(value);
        });
      },
      (reason) => {
        console.log('cancelled');
      },
    );
  }
}
