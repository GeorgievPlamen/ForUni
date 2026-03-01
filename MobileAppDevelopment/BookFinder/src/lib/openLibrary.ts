import { OpenLibraryBook, SearchResult } from '@/src/types/book';

const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org/search.json';
const PAGE_SIZE = 20;
const REQUEST_TIMEOUT_MS = 10000;

interface OpenLibraryDoc {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface OpenLibraryResponse {
  numFound?: number;
  docs?: OpenLibraryDoc[];
}

function mapDocToBook(doc: OpenLibraryDoc): OpenLibraryBook | null {
  if (!doc.key || !doc.title) {
    return null;
  }

  return {
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name?.[0]?.trim() || 'Unknown author',
    first_publish_year: doc.first_publish_year ?? null,
    cover_id: doc.cover_i ?? null,
  };
}

export async function searchBooks(query: string, page: number): Promise<SearchResult> {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    throw new Error('Search query is required.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const url = `${OPEN_LIBRARY_BASE_URL}?q=${encodeURIComponent(normalizedQuery)}&page=${page}&limit=${PAGE_SIZE}`;

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error('OpenLibrary request failed.');
    }

    const data = (await response.json()) as OpenLibraryResponse;
    const books = (data.docs ?? []).map(mapDocToBook).filter((book): book is OpenLibraryBook => Boolean(book));
    const numFound = data.numFound ?? 0;
    const totalPages = Math.max(1, Math.ceil(numFound / PAGE_SIZE));

    return {
      books,
      numFound,
      page,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Could not load search results. Check your internet connection.');
  } finally {
    clearTimeout(timeout);
  }
}
