import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from 'src/app/store/models/message';
import { SetConversationAction } from 'src/app/store/actions/conversation.action';
import { getMessages } from 'src/app/store/selectors/selectors';
import { messages } from './messages';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {

  messages$: Observable<Message[]>;

  constructor(private store: Store<any>, private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.messages$ = this.store.select(getMessages);
    this.store.dispatch(new SetConversationAction(messages));
  }

  /**
   * Getting filtered messages
   * @param keyword
   */
  searchMessages(keyword: string): Observable<Message[]> {
    return this.messages$.pipe(
        map((messages: Message[]) => messages.filter(message => message.text.includes(keyword)))
      );
  }

  /**
   * Detect change on update UI
   */
  inputValue(): void {
    this.changeDetection.markForCheck();
  }
}
