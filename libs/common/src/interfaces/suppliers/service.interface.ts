import { SupplierInterface } from './supplier.interface';
import { GrpcServiceInterface } from '../base';

export type SuppliersServiceInterface = SuppliersService;
export type SuppliersService = GrpcServiceInterface<SupplierInterface>;
