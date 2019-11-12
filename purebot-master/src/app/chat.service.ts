import { Injectable } from '@angular/core';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'

import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;

        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  similariseBotTexts(text1, text2): any {
    return this.http.get('https://twinword-text-similarity-v1.p.rapidapi.com/similarity/', {
      headers: {
        'x-rapidapi-host': 'twinword-text-similarity-v1.p.rapidapi.com',
        'x-rapidapi-key': 'e94be1c41amsh8709a947649404dp1e3208jsn374c2a15def8'
      },
      params: {
        'text1': text1,
        'text2': text2,
      }
    });
  }
}