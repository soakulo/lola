/**
 * AsyncStorage simulation interface compatible with React Native's @react-native-async-storage/asyncStorage
 * Persists session and student data using browser localStorage with async/await API.
 */

const STORAGE_PREFIX = '@lola_chem_app_';

export const AsyncStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.error('AsyncStorage getItem error:', e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_PREFIX + key, value);
    } catch (e) {
      console.error('AsyncStorage setItem error:', e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.error('AsyncStorage removeItem error:', e);
    }
  },

  async clear(): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.error('AsyncStorage clear error:', e);
    }
  },

  async getObject<T>(key: string): Promise<T | null> {
    const raw = await this.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  async setObject<T>(key: string, value: T): Promise<void> {
    await this.setItem(key, JSON.stringify(value));
  },
};
