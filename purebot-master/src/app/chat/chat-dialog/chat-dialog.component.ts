import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/chat.service';
import { scan, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  storeMessages = [];
  similarityIndex = [];
  firstChat;
  secondChat;
  constructor(public chatService: ChatService,
    private router: Router) {
    this.firstChat = JSON.parse(localStorage.getItem('saveFirstChat'));
    this.secondChat = JSON.parse(localStorage.getItem('saveSecondChat'));
    console.log(this.firstChat);
    console.log(this.secondChat);
  }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chatService.conversation.asObservable().pipe(
      tap((data) => {
        if (data[0] && data[0] != null) {
          if (data[0].sentBy === 'bot') {
            console.log('User Data', data[0] && data[0] != null ? data[0].content : '');
            this.storeMessages.push(data[0]);
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
    var dict1 = {};
    for (const i in this.firstChat) {

      switch (this.firstChat[i].intent) {
        case 'Default Welcome Intent':
          dict1['Fairness'] = this.firstChat[i].content;
          break;
        case 'Default Fallback Intent':
          dict1['Data Protection'] = this.firstChat[i].content;
          break;
        case 'account.balance.check':
          dict1['Acountability'] = this.firstChat[i].content;
          break;
        case 'Debitcard-lost':
          dict1['Transparency'] = this.firstChat[i].content;
          break;
        case 'Default Welcome Intent':
          dict1['Social Benefit'] = this.firstChat[i].content;
          break;
      }

    }


    var dict2 = {};
    for (const j in this.secondChat) {

      switch (this.secondChat[j].intent) {
        case 'Default Welcome Intent':
          dict2['Fairness'] = this.secondChat[j].content;
          break;
        case 'Default Fallback Intent':
          dict2['Data Protection'] = this.secondChat[j].content;
          break;
        case 'account.balance.check':
          dict2['Acountability'] = this.secondChat[j].content;
          break;
        case 'Debitcard-lost':
          dict2['Transparency'] = this.secondChat[j].content;
          break;
        case 'Default Welcome Intent':
          dict2['Social Benefit'] = this.secondChat[j].content;
          break;
      }
    }

    for (var key1 in dict1) {
      for (var key2 in dict2) {
        console.log(dict1[key1]);
        console.log(dict2[key2]);
        this.chatService.similariseBotTexts(dict1[key1], dict2[key2]).subscribe((response) => {
          this.similarityIndex.push(response.similarity);
          console.log(this.similarityIndex);

        })
      }
    }
    console.log('similarity is ' + this.similarityIndex[0]);

  }

  loadResults() {
    this.router.navigate(['/chart', JSON.stringify(this.similarityIndex)]);
  }
}