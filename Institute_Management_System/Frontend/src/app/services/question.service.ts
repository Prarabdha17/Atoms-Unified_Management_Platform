import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
// src/app/question.service.ts
import { Observable } from 'rxjs';
import { FileData } from '../model/FileData.model';

@Injectable({
  providedIn: 'root',
})


export class QuestionService {


  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question) {
    return this._http.post(`${baseUrl}/question/`, question);
  }
  //delete question
  public deleteQuestion(questionId) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions) {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

  public importQuestions(filedata:FileData): Observable<any> {
    console.log("File.qId"+filedata.id);
    const formData = new FormData();
    formData.append('id',filedata.id); 
    formData.append('file', filedata.file);
    return this._http.post(`${baseUrl}/quiz/bulk-upload`, formData);
  }



}
