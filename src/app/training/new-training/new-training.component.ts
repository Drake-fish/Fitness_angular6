import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {  Subscription } from 'rxjs';




@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) { }

              ngOnInit() {
                this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
                this.trainingService.fetchAvailiableExercises();
              }
  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
