import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {
  page = input<number>(0);        // total de páginas
  currentPage = input<number>(1); // página actual
  activePage = linkedSignal(this.currentPage);

  getPagesList = computed(() => {
    const total = this.page();
    const current = this.activePage();
    const delta = 2; // cuántos números mostrar alrededor
    const pages: (number | string)[] = [];

    const add = (p: number | string) => pages.push(p);

    // Siempre mostrar la primera página
    add(1);

    // "..." antes
    if (current - delta > 2) add("...");

    // Páginas antes
    for (let i = current - delta; i < current; i++) {
      if (i > 1) add(i);
    }

    // Página actual (si no es 1 ni la última)
    if (current !== 1 && current !== total) add(current);

    // Páginas después
    for (let i = current + 1; i <= current + delta; i++) {
      if (i < total) add(i);
    }

    // "..." después
    if (current + delta < total - 1) add("...");

    // Siempre mostrar la última página
    if (total > 1) add(total);

    return pages;
  });

  goToPage(page: number) {
    this.activePage.set(page);
  }

  onPageClick(p: number | string) {
    if (typeof p === 'number') {
      this.goToPage(p);
    }
  }

}
