import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {  Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';




@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  loadingSubscription: Subscription;
  isLoading = false;
  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UIService) { }

              ngOnInit() {
                this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
                  this.isLoading = isLoading;
                });
                this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
                this.trainingService.fetchAvailiableExercises();
              }
  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
  fetchExercises(){
    this.trainingService.fetchAvailiableExercises();
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
