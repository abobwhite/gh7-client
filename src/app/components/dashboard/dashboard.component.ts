import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {faAmbulance, faHandsHelping, faLifeRing, faMobileAlt, faUserShield} from '@fortawesome/free-solid-svg-icons';
import {UserAssistanceService} from '../../services/userAssistance.service';
import {UserAssistanceRequest} from '../../models/UserAssistanceRequest';
import {ASSISTANCE_CAPABILITY} from '../../models/ASSISTANCE_CAPABILITY';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

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
  faMobileAlt = faMobileAlt;
  user$: Observable<User>;

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private userAssistanceService: UserAssistanceService,
              private userService: UserService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.getAuthenticatedUser();
  }

  getGeneralAssistance(): void {
    this.userAssistanceService.createPhoneRequest().subscribe(() => {
      this.translate.get('dashboard.seekAssistance.wait').subscribe((res: string) => {
        this.snackBar.open(res);
      });
    });
  }

  getMedicalAssistance(): void {
    const request = new UserAssistanceRequest();
    request.requestedCapability = ASSISTANCE_CAPABILITY.MEDICAL_TRANSLATION;
    this.userAssistanceService.createEmergencyRequest(request).subscribe(() => {
      this.translate.get('dashboard.seekAssistance.wait').subscribe((res: string) => {
        this.snackBar.open(res);
      });
    });
  }

  getLawEnforcementAssistance(): void {
    const request = new UserAssistanceRequest();
    request.requestedCapability = ASSISTANCE_CAPABILITY.LAW_ENFORCEMENT_TRANSLATION;
    this.userAssistanceService.createEmergencyRequest(request).subscribe(() => {
      this.translate.get('dashboard.seekAssistance.wait').subscribe((res: string) => {
        this.snackBar.open(res);
      });
    });
  }

  toggleVolunteerOnCall(userId: string, currentOnCall: boolean): void {
    const onCall = !currentOnCall;
    this.user$ = this.userService.updateUser(userId, {onCall})
      .pipe(
        map((user) => {
          this.snackBar.open(onCall ? 'You are now available for immediate assistance' :
            'You are no longer available for immediate assistance');
          return user;
        })
      );
  }
}
