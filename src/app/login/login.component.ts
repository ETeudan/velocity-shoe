import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Validators, FormControl } from '@angular/forms';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    csrfToken: string;
    userName: string;
    password: string;
    tokenLoaded = false;
    emailForm = new FormControl('', [Validators.required, Validators.email]);
    passwordForm = new FormControl('', [Validators.required]);

    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,
        private titleService: Title, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
        private toasterService: ToasterService) {
       this.initializeMatIcons(iconRegistry, sanitizer);
    }

    ngOnInit() {
        /* read the token from Kodaris API */
        this.authService.getTokenKodaris().subscribe((data: any) => {
            if (!!data.success) {
                this.csrfToken = data.csrfToken;
                this.tokenLoaded = true;

                this.userName = "johnny+velocity@kodaris.com";//todo - remove
                this.password = "velocity123";//todo - remove
            }
        });
        /* set the title */
        this.titleService.setTitle("Login - Velocity");
    }

    
    /* login the user */
    login(formValues) {
        this.authService.login(formValues.userName, formValues.decryptedPassword, this.csrfToken)
            .subscribe((data: any) => {
                if (!data.success) {
                    this.toasterService.pop('success', 'Success', 'Login success');
                    this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || 'products');
                } else {
                    this.toasterService.pop('error', 'Error', 'Login invalid');
                }
            })
    }

    /* logout the user */
    logout() {
        if (this.authService.logout()) {
            this.router.navigate(['login'])
        }
    }

    /* initialize mat-icons */
    initializeMatIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'visibility',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility-24px.svg'));
        iconRegistry.addSvgIcon(
            'visibility_off',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility_off-24px.svg'));
    }

    /* get error message for input form */
    getErrorMessage() {
        return this.emailForm.hasError('required') ? 'You must enter a value' :
            this.emailForm.hasError('email') ? 'Not a valid email' :
                '';
    }

    /* get error message for input form */
    getErrorMessagePassword() {
        return 'You must enter a value';
    }
}
