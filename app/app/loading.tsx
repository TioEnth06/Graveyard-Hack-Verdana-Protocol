export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-[var(--bg)]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
    </div>
  );
}
