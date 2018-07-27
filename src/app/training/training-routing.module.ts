import { NgModule } from "../../../node_modules/@angular/core";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { TrainingComponent } from "./training.component";
import { AuthGuard } from "../auth/auth.guard";


const routes: Routes = [
    {path: '', component: TrainingComponent, canActivate: [AuthGuard]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule{}