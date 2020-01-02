import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { MatTable } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';

import { ProductListDataSource } from './product-list.datasource';
import { MainNavService } from '../main-nav/main-nav.service';
import { ProductService } from '../shared/product.service';
import { IProduct } from '../shared/product.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit, OnInit {
    @ViewChild(MatTable, { static: false }) table: MatTable<IProduct>;
    /* rows count of table */
    numberOfRows: number;
    /* Columns displayed in the table. */
    displayedColumns = ['code', 'name', 'color', 'size', 'manufacturer', 'price', 'url'];

    constructor(private productService: ProductService, private route: ActivatedRoute, private auth: AuthService,
                private titleService: Title, private mainNavService: MainNavService,
                iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        this.initializeMatIcons(iconRegistry, sanitizer);
        this.numberOfRows = 20;
    }

    ngOnInit() {
        this.titleService.setTitle("Product List - Velocity");
        this.mainNavService.setTitle("Shoes");
    }

    ngAfterViewInit() {
        this.table.dataSource = new ProductListDataSource(this.productService);
    }

    initializeMatIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'keyboard_arrow_down',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/keyboard_arrow_down-24px.svg'));
    }
}
