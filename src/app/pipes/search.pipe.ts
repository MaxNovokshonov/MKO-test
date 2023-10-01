import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(originalText: string, textToFind: string): SafeHtml {
    if (!textToFind) {
      return originalText;
    }

    const pattern = textToFind
      .replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
      .split(' ')
      .filter((t) => t.length > 0)
      .join('|');

    const regex = new RegExp(pattern, 'gi');

    const result = textToFind
      ? originalText.replace(
          regex,
          (match) => `<span style="background-color: rgba(137, 191, 243, 0.6)">${match}</span>`,
        )
      : originalText;

    return this._sanitizer.bypassSecurityTrustHtml(result);
  }
}
