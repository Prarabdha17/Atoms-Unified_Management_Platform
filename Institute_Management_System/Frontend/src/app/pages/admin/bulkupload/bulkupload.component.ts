import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData } from 'src/app/model/FileData.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})
export class BulkuploadComponent implements OnInit {
  qid: any;
  public fileData:FileData;

 

  selectedFile: File | null = null;

  constructor(private questionService: QuestionService,
    private _route: ActivatedRoute,) {
      this.fileData = new FileData();
         this.fileData.id = null;
         this.fileData.file = null;

      }

  ngOnInit(): void {
   

    this.qid = this._route.snapshot.params.qid;
    console.log("Quiz Id"+this.qid);

  }

  onFileChange(event: any): void {

    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    
    if (this.selectedFile) {
      console.log('Before FileSize', this.selectedFile.size);
      console.log('Before QId', this.qid);


      this.fileData.id=this.qid;
      this.fileData.file=this.selectedFile;

      console.log('After FileData', this.fileData.file.size);
      console.log('After QId', this.fileData.id);


      this.questionService.importQuestions(this.fileData).subscribe(
        response => {
          Swal.fire('Success', 'quiz is added', 'success');
          window.history.back()


        },
        error => {
          Swal.fire('Success', 'quiz is added', 'success');
          window.history.back()

        }
      );
    }
  }

}
