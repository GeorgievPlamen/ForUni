import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BookCard } from '@/src/components/BookCard';
import { PaginationControls } from '@/src/components/PaginationControls';
import { SearchInput } from '@/src/components/SearchInput';
import { isFavorited, upsertFavorite } from '@/src/lib/db';
import { searchBooks } from '@/src/lib/openLibrary';
import { colors } from '@/src/theme/colors';
import { OpenLibraryBook } from '@/src/types/book';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});
  const [refreshTick, setRefreshTick] = useState(0);

  const canGoBack = page > 1;
  const canGoNext = page < totalPages;

  const hasSearched = submittedQuery.length > 0;
  const isEmpty = hasSearched && !loading && !error && books.length === 0;

  useEffect(() => {
    if (!hasSearched) {
      return;
    }

    const runSearch = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await searchBooks(submittedQuery, page);
        setBooks(result.books);
        setTotalPages(result.totalPages);
        setTotalResults(result.numFound);
      } catch (searchError) {
        setError(searchError instanceof Error ? searchError.message : 'Search failed.');
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [hasSearched, page, refreshTick, submittedQuery]);

  useEffect(() => {
    if (books.length === 0) {
      setFavoriteMap({});
      return;
    }

    const loadFavoriteMap = async () => {
      const entries = await Promise.all(
        books.map(async (book) => [book.key, await isFavorited(book.key)] as const)
      );
      setFavoriteMap(Object.fromEntries(entries));
    };

    loadFavoriteMap();
  }, [books]);

  const searchMeta = useMemo(() => {
    if (!hasSearched) {
      return 'Search OpenLibrary to find books.';
    }
    return `${totalResults.toLocaleString()} results`;
  }, [hasSearched, totalResults]);

  const onSubmitSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a book title, author, or keyword.');
      return;
    }
    setSubmittedQuery(trimmed);
    setPage(1);
  };

  const onAddFavorite = async (book: OpenLibraryBook) => {
    try {
      await upsertFavorite(book);
      setFavoriteMap((current) => ({ ...current, [book.key]: true }));
    } catch (dbError) {
      setError(dbError instanceof Error ? dbError.message : 'Failed to save favorite.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>BookFinder</Text>
        <Text style={styles.meta}>{searchMeta}</Text>

        <SearchInput
          value={query}
          onChangeText={setQuery}
          onSubmit={onSubmitSearch}
          placeholder="Search books..."
          buttonText="Search"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                isFavorited={Boolean(favoriteMap[item.key])}
                onPressFavorite={() => onAddFavorite(item)}
                favoriteLabel={favoriteMap[item.key] ? 'Saved' : 'Add to Favorites'}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              isEmpty ? <Text style={styles.empty}>No books found for this query.</Text> : null
            }
            refreshControl={
              hasSearched ? (
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    if (!hasSearched) {
                      return;
                    }
                    setPage(1);
                    setRefreshTick((current) => current + 1);
                  }}
                  tintColor={colors.accent}
                />
              ) : undefined
            }
          />
        )}

        <PaginationControls
          page={page}
          totalPages={totalPages}
          onNext={() => canGoNext && setPage((current) => current + 1)}
          onPrev={() => canGoBack && setPage((current) => current - 1)}
          canGoNext={canGoNext}
          canGoPrev={canGoBack}
          visible={hasSearched && books.length > 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
  },
  meta: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 14,
  },
  error: {
    color: colors.danger,
    marginBottom: 10,
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 12,
    gap: 10,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
});
