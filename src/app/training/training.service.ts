import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
@Injectable()
export class TrainingService {
    private availiableExercises: Exercise[] = [];
    exercisesChanged = new Subject<Exercise[]>();
    private runningExercise: Exercise;
    exerciseChanged= new Subject<Exercise>();
    private exercises: Exercise[] = [];
    constructor(private db : AngularFirestore){

    }

    fetchAvailiableExercises(): void {
        this.db
        .collection('availiableExercises')
        .snapshotChanges()
        .pipe(map(docsArray => {
            return docsArray.map(doc => {
                return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data() as Exercise
                };
            });
        }))
        .subscribe((remappedDocsArray: Exercise[]) => {
            this.availiableExercises = remappedDocsArray;
            this.exercisesChanged.next([...this.availiableExercises]);
        });
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
        return this.exercises.slice();
    }


}