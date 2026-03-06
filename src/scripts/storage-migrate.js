import { canUseIdb, getKV, setKV } from './idb-kv.js';

const MIGRATION_FLAG = 'localStorage-to-idb-v1';
const MIGRATIONS_KEY = 'migrations';
const LEGACY_KEYS = {
  progress: 'cyber-study-progress-v1',
  notes: 'cyber-study-notes-v2',
  noteExportMeta: 'cyber-study-note-export-meta-v1'
};

const migrateStorage = async () => {
  if (!canUseIdb()) return false;

  const migrations = (await getKV(MIGRATIONS_KEY)) || {};
  if (migrations[MIGRATION_FLAG]) return true;

  for (const [nextKey, legacyKey] of Object.entries(LEGACY_KEYS)) {
    const existing = await getKV(nextKey);
    const legacyValue = localStorage.getItem(legacyKey);
    if (existing != null || !legacyValue) continue;

    try {
      await setKV(nextKey, JSON.parse(legacyValue));
    } catch {
      // Ignore malformed legacy data and leave the fallback copy untouched.
    }
  }

  await setKV(MIGRATIONS_KEY, {
    ...migrations,
    [MIGRATION_FLAG]: new Date().toISOString()
  });

  return true;
};

const migrationReady =
  globalThis.__cyberStudyMigrationPromise || (globalThis.__cyberStudyMigrationPromise = migrateStorage());

export { migrationReady, migrateStorage };
