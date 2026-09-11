'use client';

import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react';
import { type StoredChartData } from '@/lib/types';

export const HOROSCOPE_HISTORY_KEY = 'HOROSCOPE_FORM_HISTORY';

export const isValidHistoryItem = (item: unknown): item is StoredChartData => {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.name === 'string' &&
    typeof candidate.dob === 'string' &&
    typeof candidate.tob === 'string' &&
    typeof candidate.pob === 'string' &&
    (candidate.coords === null || (
      typeof candidate.coords === 'object' &&
      candidate.coords !== null &&
      typeof (candidate.coords as Record<string, unknown>).lat === 'string' &&
      typeof (candidate.coords as Record<string, unknown>).lon === 'string'
    ))
  );
};

export const formatDobDisplay = (dobStr: string): string => {
  if (!dobStr) return '';
  const parts = dobStr.split('-'); // dobStr is DD-MM-YYYY
  if (parts.length !== 3) return dobStr;
  const [d, m, y] = parts;
  const monthIdx = parseInt(m, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return dobStr;

  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${monthsEn[monthIdx]} ${y}`;
};

export function useProfileHistory(currentNameQuery: string = '') {
  const [history, setHistory] = useState<StoredChartData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(-1);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HOROSCOPE_HISTORY_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const validHistory = parsed.filter(isValidHistoryItem);
            setHistory(validHistory);
          }
        }
      } catch (error) {
        console.error('Error loading profile history:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        setActiveHistoryIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredHistory = useMemo(() => {
    const query = currentNameQuery.trim().toLowerCase();
    if (!query) return history;
    return history.filter(item => item.name.toLowerCase().includes(query));
  }, [history, currentNameQuery]);

  const historyMap = useMemo(() => {
    const map = new Map<string, StoredChartData>();
    for (let i = 0; i < history.length; i++) {
      const item = history[i];
      const nameKey = item.name.toLowerCase();
      if (!map.has(nameKey)) {
        map.set(nameKey, item);
      }
    }
    return map;
  }, [history]);

  const saveProfile = (newProfile: StoredChartData) => {
    if (!newProfile.name.trim() || newProfile.name.trim().length < 2) return;

    const updatedHistory = [
      newProfile,
      ...history.filter(item =>
        item.name.toLowerCase() !== newProfile.name.trim().toLowerCase()
      )
    ].slice(0, 5);

    setHistory(updatedHistory);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(HOROSCOPE_HISTORY_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Error saving profile history:', error);
      }
    }
  };

  const handleSelectHistory = (
    item: StoredChartData,
    onSelect: (item: StoredChartData) => void
  ) => {
    onSelect(item);
    setShowHistory(false);
    setActiveHistoryIndex(-1);
  };

  const handleHistoryKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    onSelect: (item: StoredChartData) => void
  ) => {
    if (!showHistory || filteredHistory.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveHistoryIndex(prev => (prev < filteredHistory.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveHistoryIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeHistoryIndex >= 0) {
      e.preventDefault();
      handleSelectHistory(filteredHistory[activeHistoryIndex], onSelect);
    } else if (e.key === 'Escape') {
      setShowHistory(false);
      setActiveHistoryIndex(-1);
    }
  };

  return {
    history,
    filteredHistory,
    historyMap,
    showHistory,
    setShowHistory,
    activeHistoryIndex,
    setActiveHistoryIndex,
    historyRef,
    saveProfile,
    handleSelectHistory,
    handleHistoryKeyDown,
  };
}
