import { Component, DestroyRef, inject } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode$: Observable<boolean> | undefined = undefined;
  errorMessage = '';

  private _store: Store = inject(Store);

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getShowProductCode();
    this.getProducts();
  }

  getShowProductCode() {
    this.showProductCode$ = this._store.select(
      (state: any) => state.products.showProductsCode
    );
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this._store.dispatch({ type: '[Products Page] Toggle Show Product Code' });
  }
}
