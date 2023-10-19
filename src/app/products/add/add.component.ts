import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  // model for add

  addFormModule = this.fb.group({
    id: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    productName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
    categoryId: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    description: [
      '',[Validators.required, Validators.pattern('[a-zA-Z., ]+')],],
    price: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    image: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9:/._-]+')]],
  });

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private rout: Router
  ) {}
  ngOnInit(): void {}
  addNewProduct() {
    const path = this.addFormModule.value;

    let productData = {
      id: path.id,
      productName: path.productName,
      categoryId: path.categoryId,
      description: path.description,
      price: path.price,
      image: path.image,
    };

    if (this.addFormModule.valid) {
      this.ds.addProduct(productData).subscribe({
        next: (result: any) => {
          alert('Product added');
          this.rout.navigateByUrl('');
        },
      });
    } 
    else {
      alert('Please fill all...');
    }
  }
}
