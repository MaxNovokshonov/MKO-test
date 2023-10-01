import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../../common/interfaces/message';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModalComponent implements OnInit {
  @Input() fromParents: Message;

  editMessageForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.editMessageForm = this.fb.group({
      username: [this.fromParents.username, Validators.required],
      datetime: [this.fromParents.datetime, Validators.required],
      message: [this.fromParents.message, Validators.required],
    });
  }

  get username(): FormControl {
    return this.editMessageForm.get('username') as FormControl;
  }

  get datetime(): FormControl {
    return this.editMessageForm.get('datetime') as FormControl;
  }

  get message(): FormControl {
    return this.editMessageForm.get('message') as FormControl;
  }

  submit() {
    const newMessage: Message = {
      id: this.fromParents.id,
      username: this.username.value,
      datetime: this.datetime.value,
      message: this.message.value,
    };
    this.modal.close(newMessage);
  }
}
