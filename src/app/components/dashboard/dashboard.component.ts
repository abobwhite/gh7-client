import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {faAmbulance, faHandsHelping, faUserShield, faLifeRing} from '@fortawesome/free-solid-svg-icons';
import {UserAssistanceService} from '../../services/userAssistance.service';
import {UserAssistanceRequest} from '../../models/UserAssistanceRequest';
import {ASSISTANCE_CAPABILITY} from '../../models/ASSISTANCE_CAPABILITY';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faHandsHelping = faHandsHelping;
  faAmbulance = faAmbulance;
  faUserShield = faUserShield;
  faLifeRing = faLifeRing;
  user$: Observable<User>;

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private userAssistanceService: UserAssistanceService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.getAuthenticatedUser();
  }

  getMedicalAssistance(): void {
    const request = new UserAssistanceRequest();
    request.requestedCapability = ASSISTANCE_CAPABILITY.MEDICAL_TRANSLATION;
    this.userAssistanceService.createRequest(request).subscribe(() => this.snackBar.open('Hang tight'));
  }

  getLawEnforcementAssistance(): void {
    const request = new UserAssistanceRequest();
    request.requestedCapability = ASSISTANCE_CAPABILITY.LAW_ENFORCEMENT_TRANSLATION;
    this.userAssistanceService.createRequest(request).subscribe(() => this.snackBar.open('Hang tight'));
  }
}
