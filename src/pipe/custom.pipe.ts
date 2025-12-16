//THis custom pipe will throw error if data is larger than 10
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable() //Allow NestJs to manage this
export class MoreThanTenPipe implements PipeTransform { // implements PipeTransform: tells NestJS “this is a pipe”
  transform(value: any) {
    console.log('PIPE running with value:', value);

    const num = Number(value);

    if (isNaN(num) || num >= 10) {
      throw new BadRequestException('Time to clean the DB'); // throw: stop request
    }

    return num; 
  }
}
