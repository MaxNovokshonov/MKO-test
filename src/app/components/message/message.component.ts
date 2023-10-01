import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Message } from '../../common/interfaces/message';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnChanges {
  @Input() message: Message;

  @Input() searchStr: string;

  @Output() deleteButtonClick = new EventEmitter<number>();

  activeMessage = false;

  isDeleteButtonVisible = false;

  constructor(private messagesService: MessagesService) {}

  ngOnChanges(): void {
    this.messagesService.activeMessage.subscribe((value) => {
      this.activeMessage = value == this.message.id;
    });
  }

  showDeleteButton() {
    this.isDeleteButtonVisible = true;
  }

  hideDeleteButton() {
    this.isDeleteButtonVisible = false;
  }

  deleteMessage(id: number) {
    this.deleteButtonClick.emit(id);
  }
}
