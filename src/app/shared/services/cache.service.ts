import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private CACHE_DURATION_KEY = 'cache_duration';
  private DEFAULT_DURATION = 120;

  set(key: string, data: any): void {
    const cacheData = {
      data: data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  get(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    const cacheData = JSON.parse(item);
    const duration = this.getCacheDuration();
    const expirationTime = duration * 60 * 1000;
    const timeElapsed = Date.now() - cacheData.timestamp;
    const isExpired = timeElapsed > expirationTime;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheData.data;
  }

  getCacheDuration(): number {
    const stored = localStorage.getItem(this.CACHE_DURATION_KEY);
    if (!stored) {
      this.setCacheDuration(this.DEFAULT_DURATION);
      return this.DEFAULT_DURATION;
    }
    return parseInt(stored);
  }

  setCacheDuration(minutes?: number): void {
    localStorage.setItem(
      this.CACHE_DURATION_KEY,
      minutes?.toString() || this.DEFAULT_DURATION.toString()
    );
  }

  isExpired(key: string): boolean {
    const item = localStorage.getItem(key);
    if (!item) {
      return true;
    }

    try {
      const cacheData = JSON.parse(item);
      if (!cacheData.timestamp) {
        return false;
      }

      const duration = this.getCacheDuration();
      const expirationTime = duration * 60 * 1000;
      const isExpired = Date.now() - cacheData.timestamp > expirationTime;

      if (isExpired) {
        localStorage.removeItem(key);
      }

      return isExpired;
    } catch {
      return false;
    }
  }
}
