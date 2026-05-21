import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {

  private collectionName = 'metas';

  constructor(private firestore: Firestore) {}

  getMetas(): Observable<Meta[]> {
    const metasRef = collection(this.firestore, this.collectionName);
    return collectionData(metasRef, { idField: 'id' }) as Observable<Meta[]>;
  }

  addMeta(meta: string): Promise<any> {
    const metasRef = collection(this.firestore, this.collectionName);
    return addDoc(metasRef, { meta });
  }

  deleteMeta(id: string): Promise<void> {
    const metaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(metaDoc);
  }
}
