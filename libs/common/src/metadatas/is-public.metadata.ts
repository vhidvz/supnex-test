import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = Symbol('IS_PUBLIC');
export const IsPublic = () => SetMetadata(IS_PUBLIC, true);
