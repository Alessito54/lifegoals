import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetaService } from '../../services/meta.service';
import { Meta } from '../../models/meta.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  metas: Meta[] = [];
  newMeta: string = '';
  isLoading: boolean = false;
  showMetas: boolean = false;
  private subscription: Subscription | null = null;

  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.subscription = this.metaService.metas$.subscribe((metas) => {
      this.metas = metas;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Add a new goal
   */
  addMeta(): void {
    if (this.newMeta.trim() === '') {
      alert('Please enter a goal');
      return;
    }

    this.isLoading = true;
    const goalText = this.newMeta;

    // Timeout de 10 segundos por si Firebase se tarda
    const timeoutId = setTimeout(() => {
      this.isLoading = false;
      console.warn('Add meta timeout - resetting isLoading');
    }, 10000);

    this.metaService.addMeta(goalText)
      .then(() => {
        clearTimeout(timeoutId);
        this.newMeta = '';
        this.isLoading = false;
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error('Error adding goal:', error);
        this.isLoading = false;
        alert('Error: ' + error.message);
      });
  }

  /**
   * Delete a goal
   */
  deleteMeta(id: string | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this goal?')) {
      this.metaService.deleteMeta(id).catch((error) => {
        console.error('Error deleting goal:', error);
      });
    }
  }

  /**
   * Toggle show/hide metas panel
   */
  toggleMetas(): void {
    this.showMetas = !this.showMetas;
  }
}
