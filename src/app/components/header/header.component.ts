import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { MessagesService } from '../../services/messages.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  messageId: number;

  searchForm: FormGroup;

  constructor(
    private _modalService: NgbModal,
    private messagesService: MessagesService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      searchStr: [null],
    });
  }

  get search(): FormControl {
    return this.searchForm.get('searchStr') as FormControl;
  }

  ngOnInit(): void {
    this.messagesService.getAllMessages().subscribe((response) => {
      this.messageId = response.sort((a, b) => {
        return a.id - b.id;
      })[response.length - 1].id;
      this.messagesService.lastMessageId.next(this.messageId);
    });
    this.search.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this.messagesService.searchMessages.next(value);
    });
  }

  addMessage() {
    this._modalService.open(AddModalComponent).result.then(
      (result) => {
        this.messagesService.newMessage.next(result);
        console.log(result);
      },
      (reason) => {},
    );
  }
}
