import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../common/interfaces/message';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddModalComponent implements OnInit {
  addMessageForm: FormGroup;

  nextId = 0;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private messagesService: MessagesService,
  ) {
    this.addMessageForm = this.fb.group({
      username: [null, Validators.required],
      datetime: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.messagesService.lastMessageId.subscribe((value) => {
      this.nextId = value + 1;
    });
  }

  get username(): FormControl {
    return this.addMessageForm.get('username') as FormControl;
  }

  get datetime(): FormControl {
    return this.addMessageForm.get('datetime') as FormControl;
  }

  get message(): FormControl {
    return this.addMessageForm.get('message') as FormControl;
  }

  submit() {
    const newMessage: Message = {
      id: this.nextId,
      username: this.username.value,
      datetime: this.datetime.value,
      message: this.message.value,
    };
    this.modal.close(newMessage);
  }
}
