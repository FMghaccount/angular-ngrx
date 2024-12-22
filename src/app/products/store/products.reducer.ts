import { createAction, createReducer, on } from '@ngrx/store';

export interface ProductsState {
  showProductsCode: boolean;
}

export const productsInitialState: ProductsState = {
  showProductsCode: true,
};

export const productsReducer = createReducer(
  productsInitialState,
  on(createAction('[Products Page] Toggle Show Product Code'), (state) => ({
    ...state,
    showProductsCode: !state.showProductsCode,
  }))
);
