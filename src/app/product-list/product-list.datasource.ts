import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, share } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { IProduct } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

/**
 * Data source for the ProductList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductListDataSource extends DataSource<IProduct> {
  //data: ProductListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
    sort: MatSort;
    public Total: number;

    constructor(private productService: ProductService) {
        super();
        this.Total = 20;
    }

    use(products: IProduct[]) {
        this.Total = products.length;
    }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
    connect(): Observable<IProduct[]> {
        return this.productService.getProductsKodaris();

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    //const dataMutations = [
    //  this.productService.getProductsKodaris(),
    //  //this.paginator.page,
    //  this.sort.sortChange
    //];

    //return merge(...dataMutations).pipe(map(() => {
    //    return this.getPagedData(this.getSortedData(this.productService.getProductsKodaris()));
    //}));
    }

    

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
    private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
    private getSortedData(data: IProduct[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
          case 'code': return compare(+a.code, +b.code, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
