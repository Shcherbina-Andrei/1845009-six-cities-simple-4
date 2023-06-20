import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import { plainToInstance } from 'class-transformer';
import { MiddleWareInterface } from '../../types/middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

export class ValidateDtoMiddleWare implements MiddleWareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body}: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
