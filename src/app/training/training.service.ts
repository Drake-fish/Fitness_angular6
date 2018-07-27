import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { UIService } from '../shared/ui.service';
@Injectable()
export class TrainingService {
    private availiableExercises: Exercise[] = [];
    exercisesChanged = new Subject<Exercise[]>();
    private runningExercise: Exercise;
    exerciseChanged= new Subject<Exercise>();
    private exercises: Exercise[] = [];
    finishedExercisesChanged = new Subject<Exercise[]>();
    private fbSubs: Subscription[] = [];
    constructor(private db : AngularFirestore, private uiService: UIService){}

    fetchAvailiableExercises(): void {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(this.db
	//go to the collection
        .collection('availiableExercises')
	//snapshot the changes
        .snapshotChanges()
	//pull the document array out
        .pipe(map(docsArray => {
            //alter. The shape of that data to our exercise model.
            return docsArray.map(doc => {
                return {
                id: doc.payload.doc.id,
		//spread operator pulls all the data we need in our Exercise model.
                ...doc.payload.doc.data() as Exercise
                };
            });
            
        }))
	//we then want to subscribe to the results, so that if anything changes we will know about it.
        .subscribe((remappedDocsArray: Exercise[]) => {
	   //set our available exercises to our returned values 
            this.availiableExercises = remappedDocsArray;
	  //if something changes in the database let’s set our exercisesChanged Subject to the new database set.
            this.exercisesChanged.next([...this.availiableExercises]);
            this.uiService.loadingStateChanged.next(false);
        }));
    }

    startExercise(selectedId: string){
        this.runningExercise = this.availiableExercises.find(ex => ex.id === selectedId );
        this.exerciseChanged.next({...this.runningExercise});
    }

    getRunningExercise(){
        return {...this.runningExercise};
    }

    completeExercise(){
        this.addDatatoDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise( progress: number){
        this.addDatatoDatabase({...this.runningExercise, 
                            duration: this.runningExercise.duration * (progress /100 ),
                            date: new Date(), state: 'cancelled',
                            calories: this.runningExercise.calories * (progress / 100),  });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    fetchCompletedOrCancelledExercises(){
       this.fbSubs.push(this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercise: Exercise[]) => {
                this.finishedExercisesChanged.next(exercise);
            }));
    }

    private addDatatoDatabase(exercise: Exercise){
        this.db
            .collection('finishedExercises')
            .add(exercise);
    }
    cancelSubscriptions(){
        this.fbSubs.forEach(subs => subs.unsubscribe())
    }


}