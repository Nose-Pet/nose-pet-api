import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestExtras } from './interceptors/request-extras';
import { User } from 'nose-pet-entity/dist/user/user.entity';
import { UserPetGroup } from 'nose-pet-entity/dist/user-pet-group/user-pet-group.entity';

export interface IRequestAugmented extends Request {
  extras: RequestExtras;
}

export interface IRequestLocation {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export interface IRequestExtraData {
  payload?: JwtUserPayload;
  user?: User;
  userPetGroup?: UserPetGroup;
}

export interface JwtUserPayload extends JwtPayload {
  userIdx: number;
}
