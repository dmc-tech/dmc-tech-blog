import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** All non-draft posts, newest first. Dates are read in UTC so a post dated
 *  2026-09-07 always lands in September regardless of the build machine's TZ. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** "Azure Local" -> "azure-local", "SFF" -> "sff". */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface ArchiveMonth {
  month: number; // 1-12
  name: string;
  count: number;
}
export interface ArchiveYear {
  year: number;
  count: number;
  months: ArchiveMonth[];
}

/** Group posts into year -> month buckets, newest first. */
export function getArchive(posts: Post[]): ArchiveYear[] {
  const years = new Map<number, Map<number, number>>();
  for (const post of posts) {
    const d = post.data.pubDate;
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    if (!years.has(y)) years.set(y, new Map());
    const months = years.get(y)!;
    months.set(m, (months.get(m) ?? 0) + 1);
  }
  return [...years.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      count: [...months.values()].reduce((a, b) => a + b, 0),
      months: [...months.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([month, count]) => ({ month, name: MONTHS[month - 1], count })),
    }));
}

export interface TagInfo {
  tag: string; // display label (casing from the first post that used it)
  slug: string;
  count: number;
}

/** Unique tags across all posts, most-used first. */
export function getTags(posts: Post[]): TagInfo[] {
  const map = new Map<string, TagInfo>();
  for (const post of posts) {
    for (const raw of post.data.tags) {
      const slug = slugifyTag(raw);
      if (!slug) continue;
      const existing = map.get(slug);
      if (existing) existing.count++;
      else map.set(slug, { tag: raw, slug, count: 1 });
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  );
}

/** Posts whose pubDate falls in the given year (and optional month 1-12). */
export function filterByDate(
  posts: Post[],
  year: number,
  month?: number,
): Post[] {
  return posts.filter((p) => {
    const d = p.data.pubDate;
    if (d.getUTCFullYear() !== year) return false;
    if (month != null && d.getUTCMonth() + 1 !== month) return false;
    return true;
  });
}

/** Posts carrying the given tag slug. */
export function filterByTag(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => p.data.tags.some((t) => slugifyTag(t) === slug));
}

export interface AdjacentPosts {
  /** The post published just after this one (chronologically next). */
  newer?: Post;
  /** The post published just before this one (chronologically previous). */
  older?: Post;
}

/** Neighbours of `id` within a newest-first list. Missing at the ends. */
export function getAdjacentPosts(posts: Post[], id: string): AdjacentPosts {
  const i = posts.findIndex((p) => p.id === id);
  if (i === -1) return {};
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}
