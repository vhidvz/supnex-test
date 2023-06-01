import { ProductInterface } from './product.interface';
import { GrpcServiceInterface } from '../base';

export type ProductsServiceInterface = ProductsService;
export type ProductsService = GrpcServiceInterface<ProductInterface>;
