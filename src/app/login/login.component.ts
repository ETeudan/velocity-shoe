import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    csrfToken: string;
    userName: string;
    decryptedPassword: string;
    tokenLoaded = false;
    emailForm = new FormControl('', [Validators.required, Validators.email]);
    passwordForm = new FormControl('', [Validators.required]);

    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,
        private titleService: Title, private toasterService: ToasterService) {
    }

    ngOnInit() {
        /* read the token from Kodaris API */
        this.authService.getTokenKodaris().subscribe((data: any) => {
            if (!!data.success) {
                this.csrfToken = data.csrfToken;
                this.tokenLoaded = true;

                this.userName = 'johnny+velocity@kodaris.com'; // todo - remove
                this.decryptedPassword = 'velocity123'; // todo - remove
            }
        });
        /* set the title */
        this.titleService.setTitle('Login - Velocity');
    }


    /* login the user */
    login(formValues) {
        this.authService.login(formValues.userName, formValues.decryptedPassword, this.csrfToken)
            .subscribe((data: any) => {
                if (!data.success) {
                    this.toasterService.pop('success', 'Success', 'Login success');
                    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'products');
                } else {
                    this.toasterService.pop('info', 'Info', 'Something went wrong. Try again.');
                }
            },
                (error: HttpErrorResponse) => {
                    this.toasterService.pop('error', 'Error', 'Login invalid');
                }
            );
    }

    /* logout the user */
    logout() {
        if (this.authService.logout()) {
            this.router.navigate(['login']);
        }
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
