import { Component, effect, Input, OnDestroy, output, signal } from '@angular/core';

@Component({
  selector: 'buscar-personaje',
  imports: [],
  templateUrl: './buscar-personaje.html',
})
export class BuscarPersonaje implements OnDestroy {
  @Input() placeholder: string = '';
  value = output<string>();

  private term = signal('');
  private timeoutId: any;
  private initialized = false; //  CLAVE

  constructor() {
    effect(() => {
      const current = this.term();

      // ===== ignorar primera ejecución =====
      if (!this.initialized) {
        this.initialized = true;
        return;
      }

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.value.emit(current);
      }, 300);
    });
  }

  onInput(value: string) {
    this.term.set(value);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

}

