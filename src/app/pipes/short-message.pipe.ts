import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortMessage',
})
export class ShortMessagePipe implements PipeTransform {
  transform(message: string): string {
    if (message.length < 100) {
      return message;
    }
    return `${message.slice(0, 100)}...`;
  }
}
