import { IsOptional, Validate } from 'class-validator';
import { IsString, IsStringNumber } from '../validations/common.validation';

export class ListFilterQueryDto {
  @IsOptional()
  @Validate(IsStringNumber)
  limit?: number;

  @IsOptional()
  @Validate(IsStringNumber)
  offset?: number;

  @IsOptional()
  @Validate(IsString)
  searchTerm?: string;
}
