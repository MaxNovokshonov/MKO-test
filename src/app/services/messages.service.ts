import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Message } from '../common/interfaces/message';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  activeMessage = new Subject<number>();

  lastMessageId = new Subject<number>();

  newMessage = new Subject<Message>();

  isMessageEdit = new Subject();

  searchMessages = new Subject<string>();

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${BASE_URL}messages`);
  }

  deleteMessageById(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}messages/${id}`);
  }

  getMessageById(id: string): Observable<Message> {
    return this.http.get<Message>(`${BASE_URL}messages/${id}`);
  }

  addMessage(body: Message): Observable<void> {
    return this.http.post<void>(`${BASE_URL}messages`, body);
  }

  editMessage(id: number, body: Message): Observable<Message> {
    return this.http.patch<Message>(`${BASE_URL}messages/${id}`, body);
  }

  filterMessages(search: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${BASE_URL}messages`, {
      params: { q: search },
    });
  }
}
