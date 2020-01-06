import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of as observableOf, merge, of, Observer, BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

/**
 * Data source for the ProductList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductListDataSource extends DataSource<IProduct> {
    paginator: MatPaginator;
    sort: MatSort;
    private totalRows: BehaviorSubject<number> = new BehaviorSubject(null);

    constructor(private productService: ProductService) {
        super();
        this.totalRows.next(0);
    }

    /* return an Observable with totalRows from DataSource */
    countRows(): Observable<number> {
        return this.totalRows;
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<IProduct[]> {

        return Observable.create((observer: Observer<IProduct[]>) => {
            this.productService.getProductsKodaris()
                .subscribe((res: IProduct[]) => {
                    this.totalRows.next(res.length);
                    observer.next(res);
                    observer.complete();
                }, err => observer.error(err));
        });
    }



    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

}

