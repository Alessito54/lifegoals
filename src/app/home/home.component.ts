import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  metas: Meta[] = [];
  newMeta: string = '';
  isAdding: boolean = false;
  errorMsg: string = '';

  constructor(private metaService: MetaServiceService) {}

  ngOnInit(): void {
    this.metaService.getMetas().subscribe({
      next: (data) => {
        this.metas = data;
      },
      error: (err) => {
        this.errorMsg = 'Error loading goals: ' + err.message;
      }
    });
  }

  async addMeta(): Promise<void> {
    if (!this.newMeta.trim()) return;
    this.isAdding = true;
    try {
      await this.metaService.addMeta(this.newMeta.trim());
      this.newMeta = '';
    } catch (err: any) {
      this.errorMsg = 'Error adding goal: ' + err.message;
    } finally {
      this.isAdding = false;
    }
  }

  async deleteMeta(id: string): Promise<void> {
    try {
      await this.metaService.deleteMeta(id);
    } catch (err: any) {
      this.errorMsg = 'Error deleting goal: ' + err.message;
    }
  }
}
