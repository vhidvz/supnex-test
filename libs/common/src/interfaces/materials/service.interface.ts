import { MaterialInterface } from './material.interface';
import { GrpcServiceInterface } from '../base';

export type MaterialsServiceInterface = MaterialsService;
export type MaterialsService = GrpcServiceInterface<MaterialInterface>;
