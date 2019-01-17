import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router, ResolveStart } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.quizService.GetAnswers().subscribe(
      (data: any) => {
        this.quizService.correctAnswerCount = 0;
        this.quizService.qns.forEach((e, i) => {
          // tslint:disable-next-line:triple-equals
          if (e.answer == data[i]) {
            this.quizService.correctAnswerCount++;
            e.correct = data[i];
          }
        });
      }
    );
  }

  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.restart();
    });
  }
  restart() {
    this.router.navigate(['/quiz']);
  }

}
