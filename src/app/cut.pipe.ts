import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})

// tslint:disable-next-line: class-name
export class CutPipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 18 ? value.substring(0, 18) + '..' : value;
  }
}

