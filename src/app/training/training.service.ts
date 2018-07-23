import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
    private availiableExercises: Exercise[] = [
        {id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories:15 },
        {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        {id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }

    ]
    private runningExercise: Exercise;
    exerciseChanged= new Subject<Exercise>();
    private exercises: Exercise[] = [];
    constructor(){

    }

    getExercises(){
        return this.availiableExercises.slice();
    }

    startExercise(selectedId: string){
        this.runningExercise = this.availiableExercises.find(ex => ex.id === selectedId );
        this.exerciseChanged.next({...this.runningExercise});
    }

    getRunningExercise(){
        return {...this.runningExercise};
    }

    completeExercise(){
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise( progress: number){
        this.exercises.push({...this.runningExercise, 
                            duration: this.runningExercise.duration * (progress /100 ),
                            date: new Date(), state: 'cancelled',
                            calories: this.runningExercise.calories * (progress / 100),  });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getCompletedOrCancelledExercises(){
        console.log(this.exercises.slice())
        return this.exercises.slice();
    }


}