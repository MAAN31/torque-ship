/**
 * Injects a JSON-LD block using Next.js's documented pattern for structured
 * data in the App Router: a script tag rendered straight from a server
 * component, no head-tag gymnastics required.
 * https://nextjs.org/docs/app/guides/json-ld
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
