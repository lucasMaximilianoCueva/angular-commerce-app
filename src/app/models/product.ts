export class Product {
  id: number;
  name: string;
  description: string;
  stock: string;
  price: number;
  imageUrl: string;

  constructor(id, name, description = '', stock = '', price = 0, imageUrl = 'https://i.blogs.es/e1fe2b/apple-macbook-pro-16/840_560.jpg') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
