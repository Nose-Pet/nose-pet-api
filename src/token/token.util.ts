import * as jwt from 'jsonwebtoken';
import { config } from '../app/config/config.service';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { JwtUserPayload } from '../app/app.interface';
import { HttpStatus } from '@nestjs/common';

export type JwtPayloadType = string | object | Buffer;
export type JwtExpiresInType = string | number;

export const jwtSign = (payload: JwtPayloadType, expiresIn: JwtExpiresInType): string => {
  return jwt.sign(payload, config.jwtSecretKey, { expiresIn });
};

export const jwtVerify = (token: string): JwtUserPayload => {
  try {
    return jwt.verify(token, config.jwtSecretKey) as JwtUserPayload;
  } catch (e) {
    if (e instanceof Error) {
      switch (e.message) {
        case 'jwt expired':
          throw new ClientRequestException(ERROR_CODE.ERR_002_0006, HttpStatus.UNAUTHORIZED);
        case 'invalid token':
          throw new ClientRequestException(ERROR_CODE.ERR_002_0005, HttpStatus.UNAUTHORIZED);
        case 'invalid signature':
          throw new ClientRequestException(ERROR_CODE.ERR_002_0007, HttpStatus.UNAUTHORIZED);
        default:
          throw new ClientRequestException(ERROR_CODE.ERR_000_0003, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const jwtTokenTimeLeft = async (payload: JwtUserPayload): Promise<number> => {
  if (!payload.exp) {
    throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return payload.exp - Date.now() / 1000;
};
