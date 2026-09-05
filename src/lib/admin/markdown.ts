/* Markdown <-> post-block converters.
 * Posts store content as [{ heading?, body[] }]; the admin edits Markdown.
 */

export type PostBlock = { heading?: string; body: string[] };

export function blocksToMarkdown(blocks: PostBlock[]): string {
  return blocks
    .map((b) => {
      const head = b.heading ? `## ${b.heading}\n\n` : "";
      return head + b.body.join("\n\n");
    })
    .join("\n\n");
}

export function markdownToBlocks(md: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  let current: PostBlock = { body: [] };
  const push = () => {
    const body = current.body.filter((p) => p.trim().length > 0);
    if ((current.heading && current.heading.trim()) || body.length > 0) {
      blocks.push({ ...(current.heading ? { heading: current.heading.trim() } : {}), body });
    }
  };
  for (const raw of md.split("\n")) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      push();
      current = { heading: line.slice(3).trim(), body: [] };
    } else if (line.trim() === "") {
      if (current.body.length > 0) current.body.push("");
    } else {
      const last = current.body[current.body.length - 1];
      if (last === "") current.body[current.body.length - 1] = line.trim();
      else if (last === undefined) current.body.push(line.trim());
      else current.body[current.body.length - 1] = `${last} ${line.trim()}`;
    }
  }
  push();
  return blocks.map((b) => ({ ...b, body: b.body.filter((p) => p.trim().length > 0) }));
}

export function estimateReadTime(md: string): string {
  const words = md.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
