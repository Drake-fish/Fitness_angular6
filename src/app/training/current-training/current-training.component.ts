import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import {StopTrainingComponent} from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress= 0;
  timer;
  constructor(private dialog: MatDialog, private trainingService : TrainingService) { }

  ngOnInit() {
    this.startOrResumeTime();

  }

  startOrResumeTime(){
    //step is the duration of how long the exercise takes. We want to get the running exercise that we have then divide that duration by 100 and multiply by 1000 to get the miliseconds.
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer= setInterval(()=>{
      this.progress = this.progress + 1;
      if(this.progress >= 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    },step)
  }
  onStop(){
    const dialogRef= this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trainingService.cancelExercise(this.progress)
      }else{
        this.startOrResumeTime();
      }
    });
    clearInterval(this.timer);
  }
}
