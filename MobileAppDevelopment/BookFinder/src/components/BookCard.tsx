import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import { FavoriteBook, OpenLibraryBook } from '@/src/types/book';

type CardBook = OpenLibraryBook | FavoriteBook;

interface BookCardProps {
  book: CardBook;
  isFavorited: boolean;
  onPressFavorite: () => void;
  favoriteLabel: string;
  favoriteVariant?: 'accent' | 'danger';
}

function getCoverUrl(coverId: number | null) {
  if (!coverId) {
    return null;
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

export function BookCard({
  book,
  isFavorited,
  onPressFavorite,
  favoriteLabel,
  favoriteVariant = 'accent',
}: BookCardProps) {
  const coverUrl = getCoverUrl(book.cover_id);
  const actionColor = favoriteVariant === 'danger' ? colors.danger : colors.accent;

  return (
    <View style={styles.card}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverFallback]}>
          <Text style={styles.coverFallbackText}>No Cover</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.title}>
          {book.title}
        </Text>
        <Text numberOfLines={1} style={styles.author}>
          {book.author_name}
        </Text>
        <Text style={styles.year}>{book.first_publish_year ?? 'Year unknown'}</Text>

        <Pressable
          style={[
            styles.favoriteButton,
            { backgroundColor: actionColor },
            isFavorited && favoriteVariant === 'accent' ? styles.favoriteSaved : null,
          ]}
          onPress={onPressFavorite}>
          <Text style={styles.favoriteText}>{favoriteLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cover: {
    width: 90,
    height: 130,
    backgroundColor: colors.surfaceAlt,
  },
  coverFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  coverFallbackText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  body: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  author: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  year: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  favoriteButton: {
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  favoriteSaved: {
    opacity: 0.85,
  },
  favoriteText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 12,
  },
});
