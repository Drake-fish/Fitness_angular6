import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth=authStatus;
    })
  }
  close(){
    this.closeEvent.emit();
  }
  onLogout(){
    this.authService.logout();
    this.closeEvent.emit();
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
