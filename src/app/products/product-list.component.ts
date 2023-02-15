import {Component, OnDestroy, OnInit} from "@angular/core";
import {Iproduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService) {
  }

  pageTitle: string = 'Product List';

  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value)
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: Iproduct[] = [];

  products: Iproduct[] = [];

  performFilter(filterBy: string): Iproduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: Iproduct) =>
      product.productName.toLowerCase().includes(filterBy))
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
