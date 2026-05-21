import { Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Meta } from '../models/meta.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private metasSubject = new Subject<Meta[]>();
  public metas$ = this.metasSubject.asObservable();

  constructor(private firestore: Firestore, private ngZone: NgZone) {
    this.loadMetas();
  }

  /**
   * Carga todas las metas de Firestore
   */
  loadMetas(): void {
    console.log('MetaService: loadMetas() called');
    const metasRef = collection(this.firestore, 'metas');
    onSnapshot(metasRef, (snapshot) => {
      this.ngZone.run(() => {
        console.log('MetaService: Firestore snapshot received, docs count:', snapshot.size);
        const metas: Meta[] = [];
        snapshot.forEach((doc) => {
          console.log('MetaService: Processing doc:', doc.id, doc.data());
          metas.push({
            id: doc.id,
            ...doc.data() as Meta
          });
        });
        console.log('MetaService: Emitting metas:', metas);
        this.metasSubject.next(metas);
      });
    }, (error) => {
      console.error('MetaService: Firestore error:', error);
    });
  }

  /**
   * Obtiene todas las metas de forma asincróna
   */
  getMetas(): Promise<Meta[]> {
    const metasRef = collection(this.firestore, 'metas');
    return getDocs(metasRef).then((snapshot) => {
      const metas: Meta[] = [];
      snapshot.forEach((doc) => {
        metas.push({
          id: doc.id,
          ...doc.data() as Meta
        });
      });
      return metas;
    });
  }

  /**
   * Agrega una nueva meta a Firestore
   */
  addMeta(meta: string): Promise<string> {
    return this.ngZone.run(() => {
      const metasRef = collection(this.firestore, 'metas');
      return addDoc(metasRef, {
        meta: meta,
        createdAt: new Date()
      }).then((docRef) => {
        console.log('Meta added:', docRef.id);
        return docRef.id;
      });
    });
  }

  /**
   * Elimina una meta de Firestore
   */
  deleteMeta(id: string): Promise<void> {
    return this.ngZone.run(() => {
      const metaRef = doc(this.firestore, 'metas', id);
      return deleteDoc(metaRef).then(() => {
        console.log('Meta deleted:', id);
      });
    });
  }
}
