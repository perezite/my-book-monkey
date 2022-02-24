import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {

  @HostBinding('class.small') isZoomed = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isZoomed = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isZoomed = false;
  }

  constructor() { }

}
