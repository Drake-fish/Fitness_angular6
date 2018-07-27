
import { NgModule } from "../../../node_modules/@angular/core";

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "../../../node_modules/@angular/forms";
import { CommonModule } from "../../../node_modules/@angular/common";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "../../../node_modules/@angular/flex-layout";
import { AngularFireAuthModule } from "../../../node_modules/angularfire2/auth";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [ FormsModule,
               ReactiveFormsModule,
               CommonModule,
               MaterialModule,
               FlexLayoutModule,
               AngularFireAuthModule
             ],
    exports: []
})
export class AuthModule {}