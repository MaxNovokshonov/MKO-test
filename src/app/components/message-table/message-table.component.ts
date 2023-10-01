import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../common/interfaces/message';
import { Observable, switchMap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.scss'],
})
export class MessageTableComponent implements OnInit {
  messages$: Observable<Message[]>;

  searchStr: string;

  page = 1;

  messagePerPage = 10;

  public labels: any = {
    previousLabel: 'Предыдущая',
    nextLabel: 'Следующая',
  };

  constructor(
    private messagesService: MessagesService,
    private _modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.messages$ = this.messagesService.getAllMessages();
    this.messagesService.newMessage.subscribe((value) => {
      this.messages$ = this.messagesService.addMessage(value).pipe(
        switchMap(() => {
          return this.messagesService.getAllMessages();
        }),
      );
    });
    this.messagesService.isMessageEdit.subscribe(() => {
      this.messages$ = this.messagesService.getAllMessages();
    });
    this.messagesService.searchMessages.subscribe((value) => {
      this.searchStr = value;
      this.messages$ = this.messagesService.filterMessages(value);
    });
  }

  openModal($event: number) {
    this._modalService.open(DeleteModalComponent).result.then(
      (result) => {
        this.messages$ = this.messagesService.deleteMessageById($event).pipe(
          switchMap(() => {
            return this.messagesService.getAllMessages();
          }),
        );
      },
      (reason) => {},
    );
  }
}
