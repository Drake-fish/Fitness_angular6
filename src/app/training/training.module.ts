
import { NgModule } from "../../../node_modules/@angular/core";

import { FormsModule } from "../../../node_modules/@angular/forms";
import { CommonModule } from "../../../node_modules/@angular/common";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "../../../node_modules/@angular/flex-layout";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingRoutingModule } from "./training-routing.module";

@NgModule({
    declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent

    ],
    imports: [ FormsModule,
               CommonModule,
               MaterialModule,
               FlexLayoutModule,
               TrainingRoutingModule
             ],
    exports: []
})
export class TrainingModule {}