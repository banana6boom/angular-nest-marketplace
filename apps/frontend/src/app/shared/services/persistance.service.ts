import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor() { }

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  getItem(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null; // Если ключ не найден
      }
      return JSON.parse(item); // Возвращаем распарсенные данные
    } catch (e) {
      console.error('Error getting item from localStorage', e);
      return null; // В случае ошибки парсинга возвращаем null
    }
  }
}
