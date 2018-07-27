
import { NgModule } from "../../../node_modules/@angular/core";

import { FormsModule, ReactiveFormsModule } from "../../../node_modules/@angular/forms";
import { CommonModule } from "../../../node_modules/@angular/common";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "../../../node_modules/@angular/flex-layout";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";

@NgModule({
    declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    StopTrainingComponent

    ],
    imports: [ FormsModule,
               ReactiveFormsModule,
               CommonModule,
               MaterialModule,
               FlexLayoutModule
             ],
    exports: []
})
export class TrainingModule {}