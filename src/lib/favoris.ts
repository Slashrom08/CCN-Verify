"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "ccn-verify:favoris";
const listeners = new Set<() => void>();
let cache: { raw: string | null; list: string[] } = { raw: null, list: [] };

function lire(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.list;
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    cache = { raw, list: Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [] };
    return cache.list;
  } catch {
    return cache.list;
  }
}

const VIDE: string[] = [];

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** Favoris de l'utilisateur (navigateur local). Rendu serveur : liste vide. */
export function useFavoris() {
  const favoris = useSyncExternalStore(subscribe, lire, () => VIDE);
  const pret = useSyncExternalStore(subscribe, () => true, () => false);

  const toggle = useCallback((idcc: string) => {
    const prev = lire();
    const next = prev.includes(idcc) ? prev.filter((x) => x !== idcc) : [...prev, idcc];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      cache = { raw: null, list: next };
    }
    for (const l of listeners) l();
  }, []);

  return { favoris, pret, toggle, est: (idcc: string) => favoris.includes(idcc) };
}
