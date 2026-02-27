'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[var(--bg)]">
      <h2 className="font-display text-2xl font-semibold text-[var(--text)] mb-4">
        Something went wrong
      </h2>
      <p className="text-[var(--text-muted)] mb-6 text-center max-w-md">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button type="button" onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
