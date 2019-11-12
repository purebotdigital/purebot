import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/chat.service';
import { scan, tap } from 'rxjs/operators'

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  storeMessages = [];
  similarityIndex: number;
  firstChat;
  secondChat;
  constructor(public chatService: ChatService) {
    this.firstChat = JSON.parse(localStorage.getItem('saveFirstChat'));
    this.secondChat = JSON.parse(localStorage.getItem('saveSecondChat'));
  }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chatService.conversation.asObservable().pipe(
      tap((data) => {
        if (data[0] && data[0] != null) {
          if (data[0].sentBy === 'bot') {
            console.log('User Data', data[0] && data[0] != null ? data[0].content : '');
            this.storeMessages.push(data[0].content);
          }
        }
      }),
      scan((acc, val) => acc.concat(val)));


  }

  // save first chat to cache
  saveFirstChat() {
    alert("Data saved");
    localStorage.setItem('saveFirstChat', JSON.stringify(this.storeMessages));
  }

  // save second chat to cache
  saveSecondChat() {
    alert("Data saved");
    localStorage.setItem('saveSecondChat', JSON.stringify(this.storeMessages));
  }

// press enter 
  sendMessage() {
    this.chatService.converse(this.formValue);
    this.formValue = '';
  }

  compareTexts() {
    this.chatService.similariseBotTexts(this.firstChat, this.secondChat).subscribe((response) => {
      this.similarityIndex = response.similarity;
      console.log('similarity' + this.similarityIndex);
    })
  }

}