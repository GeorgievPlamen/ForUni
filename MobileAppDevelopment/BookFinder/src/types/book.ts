export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name: string;
  first_publish_year: number | null;
  cover_id: number | null;
}

export interface FavoriteBook {
  id: number;
  book_key: string;
  title: string;
  author_name: string;
  first_publish_year: number | null;
  cover_id: number | null;
  added_at: string;
}

export interface SearchResult {
  books: OpenLibraryBook[];
  numFound: number;
  page: number;
  totalPages: number;
}
