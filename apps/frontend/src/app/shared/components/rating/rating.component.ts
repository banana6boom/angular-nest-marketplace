import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  private _rating = signal(0);

  @Input() set rating(value: number) {
    this._rating.set(value);
  }

  get rating(): number {
    return this._rating();
  }

  stars = computed(() => Array(5).fill(null));

  getFill(index: number): string {
    const fullStarts: number = Math.floor(this.rating);
    const hasHalfStart: boolean =
      this.rating % 1 >= 0.25 && this.rating % 1 < 0.75;

    if (index < fullStarts) return '#EDD146';
    if (index === fullStarts && hasHalfStart) return `url(#halfGradient-${index})`;
    return '#E1E1E1';
  }
}
