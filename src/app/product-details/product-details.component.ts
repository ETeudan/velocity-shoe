import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';

import { MainNavService } from '../main-nav/main-nav.service';
import { IProduct } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { DialogService } from '../shared/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    @ViewChild('productForm', { static: true }) private productForm: NgForm;
    product: IProduct;

    constructor(private productService: ProductService, private dialogService: DialogService,
        private route: ActivatedRoute, private titleService: Title,
        private mainNavService: MainNavService, private toasterService: ToasterService) {

        this.product = {
            uuid: 'uuid',
            code: 'code',
            name: 'name',
            description: 'description',
            price: 0,
            rating: 'rating',
            manufacturer: 'manufacturer',
            shipping: '0',
            color: '',
            size: '0',
            inStock: '0'
        };
    }

    ngOnInit() {
        this.titleService.setTitle('Product Details - Velocity');
        this.mainNavService.setTitle('Shoe');
        this.productService.getProductKodaris(this.route.snapshot.params.uuid).subscribe((data: IProduct) => {
            this.product = data;
            this.titleService.setTitle(this.product.name + '- Product Details - Velocity');
            this.mainNavService.setTitle('Shoe ' + this.product.code);
        });
    }

    canDeactivate(): Observable<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.productForm.dirty) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
    }

    updateProduct(formValues) {
        if (this.productForm.dirty) {
            this.product.uuid = this.route.snapshot.params.uuid;
            this.productService.updateProductKodaris(this.product)
                .subscribe((data: any) => {
                    if (!data.success) {
                        this.toasterService.pop('success', 'Success', 'Product updated');
                        this.productForm.form.markAsPristine();

                    } else {
                        this.toasterService.pop('info', 'Info', 'Something went wront. Try again.');
                    }
                },
                    (error: HttpErrorResponse) => {
                        this.toasterService.pop('error', 'Error', 'Product was not changed');
                    }
                );
        } else {
            this.toasterService.pop('info', 'Info', 'Nothing to save');
        }
    }

    makeDirty() {
        // we have to make the ngForm dirty when mat-select elements are touched
        this.productForm.form.markAsDirty();
    }

}
