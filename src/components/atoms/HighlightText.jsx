import React, { useMemo } from 'react';

export default function HighlightText({
  text,
  query,
  caseSensitive = false,
  highlightClass = 'bg-yellow-200 text-black font-medium',
  highlightTag: Highlight = 'mark',
  renderHighlight,
}) {
  // Escape regex special chars
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const regex = useMemo(() => {
    const terms = query.trim().split(/\s+/).map(escapeRegex);
    return new RegExp(`(${terms.join('|')})`, caseSensitive ? 'g' : 'gi');
  }, [query, caseSensitive]);

  if (!query) return <>{text}</>;

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          renderHighlight ? (
            renderHighlight(part, i)
          ) : (
            <Highlight
              key={i}
              className={highlightClass}>
              {part}
            </Highlight>
          )
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
