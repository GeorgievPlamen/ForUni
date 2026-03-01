import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { BookCard } from '@/src/components/BookCard';
import { SearchInput } from '@/src/components/SearchInput';
import { listFavorites, removeFavorite } from '@/src/lib/db';
import { colors } from '@/src/theme/colors';
import { FavoriteBook } from '@/src/types/book';

export default function FavoritesScreen() {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const rows = await listFavorites(searchTerm);
      setFavorites(rows);
    } catch (dbError) {
      setError(dbError instanceof Error ? dbError.message : 'Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites(searchText);
    }, [loadFavorites, searchText])
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadFavorites(searchText);
    }, 150);

    return () => clearTimeout(timeout);
  }, [loadFavorites, searchText]);

  const onRemove = async (bookKey: string) => {
    try {
      await removeFavorite(bookKey);
      loadFavorites(searchText);
    } catch (dbError) {
      setError(dbError instanceof Error ? dbError.message : 'Failed to remove favorite.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.meta}>Stored locally with SQLite</Text>

        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={() => loadFavorites(searchText)}
          placeholder="Search favorites by title..."
          buttonText="Find"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.book_key}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              isFavorited
              onPressFavorite={() => onRemove(item.book_key)}
              favoriteLabel="Remove"
              favoriteVariant="danger"
            />
          )}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.empty}>
                {searchText.trim()
                  ? 'No favorites match your search.'
                  : 'No favorites yet. Add books from the Search tab.'}
              </Text>
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => loadFavorites(searchText)}
              tintColor={colors.accent}
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  listContent: {
    gap: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
});
