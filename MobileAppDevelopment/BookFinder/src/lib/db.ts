import { openDatabaseSync } from 'expo-sqlite';

import { FavoriteBook, OpenLibraryBook } from '@/src/types/book';

const db = openDatabaseSync('bookfinder.db');

let initialized = false;

export async function initDb(): Promise<void> {
  if (initialized) {
    return;
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_key TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      author_name TEXT NOT NULL,
      first_publish_year INTEGER,
      cover_id INTEGER,
      added_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_favorites_added_at ON favorites(added_at DESC);
    CREATE INDEX IF NOT EXISTS idx_favorites_title ON favorites(title);
  `);

  initialized = true;
}

async function ensureInitialized() {
  if (!initialized) {
    await initDb();
  }
}

export async function upsertFavorite(book: OpenLibraryBook): Promise<void> {
  await ensureInitialized();
  const now = new Date().toISOString();

  await db.runAsync(
    `
      INSERT INTO favorites (
        book_key,
        title,
        author_name,
        first_publish_year,
        cover_id,
        added_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(book_key) DO UPDATE SET
        title = excluded.title,
        author_name = excluded.author_name,
        first_publish_year = excluded.first_publish_year,
        cover_id = excluded.cover_id,
        added_at = excluded.added_at;
    `,
    [book.key, book.title, book.author_name, book.first_publish_year, book.cover_id, now]
  );
}

export async function removeFavorite(bookKey: string): Promise<void> {
  await ensureInitialized();
  await db.runAsync('DELETE FROM favorites WHERE book_key = ?;', [bookKey]);
}

export async function isFavorited(bookKey: string): Promise<boolean> {
  await ensureInitialized();
  const result = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(1) as count FROM favorites WHERE book_key = ?;',
    [bookKey]
  );
  return (result?.count ?? 0) > 0;
}

export async function listFavorites(searchTerm = ''): Promise<FavoriteBook[]> {
  await ensureInitialized();
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return db.getAllAsync<FavoriteBook>(
      `
        SELECT
          id,
          book_key,
          title,
          author_name,
          first_publish_year,
          cover_id,
          added_at
        FROM favorites
        ORDER BY datetime(added_at) DESC;
      `
    );
  }

  return db.getAllAsync<FavoriteBook>(
    `
      SELECT
        id,
        book_key,
        title,
        author_name,
        first_publish_year,
        cover_id,
        added_at
      FROM favorites
      WHERE LOWER(title) LIKE ?
      ORDER BY datetime(added_at) DESC;
    `,
    [`%${normalizedTerm}%`]
  );
}
