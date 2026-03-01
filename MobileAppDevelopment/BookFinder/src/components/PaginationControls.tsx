import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  visible: boolean;
}

export function PaginationControls({
  page,
  totalPages,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  visible,
}: PaginationControlsProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, !canGoPrev && styles.buttonDisabled]}
        onPress={onPrev}
        disabled={!canGoPrev}>
        <Text style={styles.buttonText}>Previous</Text>
      </Pressable>

      <Text style={styles.pageText}>
        Page {page} / {totalPages}
      </Text>

      <Pressable
        style={[styles.button, !canGoNext && styles.buttonDisabled]}
        onPress={onNext}
        disabled={!canGoNext}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 92,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  pageText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
