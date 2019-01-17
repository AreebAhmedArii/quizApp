import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  readonly rootUrl = 'http://localhost:52024';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount = 0;

  constructor(private http: HttpClient) { }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    const participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }

  InsertParticipant(name: string, email: string) {
    const body = {
      Name: name,
      Email: email
    };
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  GetQuestions() {
    return this.http.get(this.rootUrl + '/api/Questions');
  }

  GetAnswers() {
    const body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore() {
    const body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + '/api/UpdateOutput', body);
  }
}
