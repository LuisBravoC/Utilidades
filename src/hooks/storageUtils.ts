// Utilidades para limpiar localStorage de forma global o por módulo

/**
 * Elimina todo el localStorage de la app (global).
 */
export function clearAllAppStorage() {
  localStorage.clear();
}

/**
 * Elimina solo la clave de localStorage asociada a un módulo.
 * @param key Clave usada por useLocalStorage en el módulo
 */
export function clearModuleStorage(key: string) {
  localStorage.removeItem(key);
}
