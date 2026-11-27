import fs from 'fs';
import path from 'path';
import { prisma } from '../config/prisma.config';
import { ContentStatus } from '../types/common.types';
import { createArticleSchema } from '../modules/articles/article.validation';

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

interface TipTapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  text?: string;
}

interface TipTapDoc {
  type: 'doc';
  content: TipTapNode[];
}

interface RawLessonSeed {
  number: number;
  phaseNumber: number;
  slug: string;
  title: string;
  arTitle: string;
  summary: string;
  difficulty: string;
  topics: string[];
}

// ---------------------------------------------------------------------------
// Inline Markdown Parser
// ---------------------------------------------------------------------------

function parseInlineMarks(text: string): TipTapNode[] {
  if (!text) return [];

  // Match: images, links, inline code, bold, italic
  const tokenRegex = /(!\[(.*?)\]\((.*?)\))|(\[(.*?)\]\((.*?)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;

  const nodes: TipTapNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      if (plain) {
        nodes.push({ type: 'text', text: plain });
      }
    }

    if (match[1]) {
      // Image: ![alt](url)
      nodes.push({
        type: 'image',
        attrs: {
          src: match[3],
          alt: match[2] || '',
        },
      });
    } else if (match[4]) {
      // Link: [label](url)
      nodes.push({
        type: 'text',
        text: match[5],
        marks: [{ type: 'link', attrs: { href: match[6], target: '_blank' } }],
      });
    } else if (match[7]) {
      // Inline Code: `code`
      nodes.push({
        type: 'text',
        text: match[8],
        marks: [{ type: 'code' }],
      });
    } else if (match[9]) {
      // Bold: **text**
      nodes.push({
        type: 'text',
        text: match[10],
        marks: [{ type: 'bold' }],
      });
    } else if (match[11]) {
      // Italic: *text*
      nodes.push({
        type: 'text',
        text: match[12],
        marks: [{ type: 'italic' }],
      });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (remaining) {
      nodes.push({ type: 'text', text: remaining });
    }
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', text }];
}

// ---------------------------------------------------------------------------
// Block Markdown to TipTap JSON Parser
// ---------------------------------------------------------------------------

export function convertMarkdownToTipTapJson(markdown: string): TipTapDoc {
  const lines = markdown.split(/\r?\n/);
  const docNodes: TipTapNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i] ?? '';
    const trimmed = rawLine.trim();

    // 1. Empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Fenced Code Blocks: ```lang ... ```
    if (trimmed.startsWith('```')) {
      const langMatch = trimmed.match(/^```([a-zA-Z0-9_-]*)/);
      const language = langMatch && langMatch[1] ? langMatch[1].toLowerCase() : 'javascript';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? '').trim().startsWith('```')) {
        codeLines.push(lines[i] ?? '');
        i++;
      }
      if (i < lines.length && (lines[i] ?? '').trim().startsWith('```')) {
        i++; // skip closing ```
      }

      docNodes.push({
        type: 'codeBlock',
        attrs: { language },
        content: [{ type: 'text', text: codeLines.join('\n') }],
      });
      continue;
    }

    // 3. Headings: # H1, ## H2, ### H3, #### H4, ##### H5
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch && headingMatch[1] && headingMatch[2]) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      docNodes.push({
        type: 'heading',
        attrs: { level },
        content: parseInlineMarks(text),
      });
      i++;
      continue;
    }

    // 4. Horizontal Rule: ---, ***, ___
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      docNodes.push({ type: 'horizontalRule' });
      i++;
      continue;
    }

    // 5. Tables: lines starting and containing |
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && (lines[i] ?? '').trim().startsWith('|') && (lines[i] ?? '').trim().endsWith('|')) {
        tableLines.push((lines[i] ?? '').trim());
        i++;
      }

      if (tableLines.length >= 2) {
        // Parse header and rows
        const parseRowCells = (rowStr: string): string[] => {
          return rowStr
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map(c => c.trim());
        };

        const headerCells = parseRowCells(tableLines[0] ?? '');
        // Second line is separator (e.g. |---|---|)
        const isSeparator = /^\|?(\s*:?-+:?\s*\|)+\s*$/.test(tableLines[1] ?? '');
        const dataRowStartIdx = isSeparator ? 2 : 1;

        const tableRowNodes: TipTapNode[] = [];

        // Header Row
        tableRowNodes.push({
          type: 'tableRow',
          content: headerCells.map(h => ({
            type: 'tableHeader',
            content: [
              {
                type: 'paragraph',
                content: parseInlineMarks(h),
              },
            ],
          })),
        });

        // Body Rows
        for (let r = dataRowStartIdx; r < tableLines.length; r++) {
          const cells = parseRowCells(tableLines[r] ?? '');
          tableRowNodes.push({
            type: 'tableRow',
            content: cells.map(c => ({
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: parseInlineMarks(c),
                },
              ],
            })),
          });
        }

        docNodes.push({
          type: 'table',
          content: tableRowNodes,
        });
        continue;
      }
    }

    // 6. Blockquote: lines starting with >
    if (trimmed.startsWith('>')) {
      const bqLines: string[] = [];
      while (
        i < lines.length &&
        ((lines[i] ?? '').trim().startsWith('>') ||
          (bqLines.length > 0 &&
            (lines[i] ?? '').trim() &&
            !(lines[i] ?? '').trim().startsWith('#') &&
            !(lines[i] ?? '').trim().startsWith('```')))
      ) {
        const curLine = (lines[i] ?? '').trim();
        if (curLine.startsWith('>')) {
          bqLines.push(curLine.replace(/^>\s?/, ''));
        } else {
          bqLines.push(curLine);
        }
        i++;
      }

      const bqText = bqLines.join('\n');
      docNodes.push({
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: parseInlineMarks(bqText),
          },
        ],
      });
      continue;
    }

    // 7. Unordered List: * or -
    if (/^[-*]\s+/.test(trimmed)) {
      const listItems: TipTapNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test((lines[i] ?? '').trim())) {
        const itemText = (lines[i] ?? '').trim().replace(/^[-*]\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInlineMarks(itemText),
            },
          ],
        });
        i++;
      }

      docNodes.push({
        type: 'bulletList',
        content: listItems,
      });
      continue;
    }

    // 8. Ordered List: 1. or 2.
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: TipTapNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test((lines[i] ?? '').trim())) {
        const itemText = (lines[i] ?? '').trim().replace(/^\d+\.\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: parseInlineMarks(itemText),
            },
          ],
        });
        i++;
      }

      docNodes.push({
        type: 'orderedList',
        content: listItems,
      });
      continue;
    }

    // 9. Regular Paragraph (accumulate multi-line paragraphs until blank line)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      (lines[i] ?? '').trim() &&
      !(lines[i] ?? '').trim().startsWith('#') &&
      !(lines[i] ?? '').trim().startsWith('```') &&
      !(lines[i] ?? '').trim().startsWith('>') &&
      !(lines[i] ?? '').trim().startsWith('|') &&
      !/^[-*]\s+/.test((lines[i] ?? '').trim()) &&
      !/^\d+\.\s+/.test((lines[i] ?? '').trim()) &&
      !/^(\-{3,}|\*{3,}|_{3,})$/.test((lines[i] ?? '').trim())
    ) {
      paraLines.push((lines[i] ?? '').trim());
      i++;
    }

    if (paraLines.length > 0) {
      const fullPara = paraLines.join(' ');
      docNodes.push({
        type: 'paragraph',
        content: parseInlineMarks(fullPara),
      });
    }
  }

  return {
    type: 'doc',
    content: docNodes,
  };
}

// ---------------------------------------------------------------------------
// Curriculum Loader
// ---------------------------------------------------------------------------

function loadCurriculumMetadata(): Map<number, RawLessonSeed> {
  const curriculumPath = path.resolve(__dirname, '../../../frontend/src/data/javascript-docs-curriculum.ts');
  if (!fs.existsSync(curriculumPath)) {
    throw new Error(`Curriculum file not found at: ${curriculumPath}`);
  }

  const content = fs.readFileSync(curriculumPath, 'utf8');
  const match = content.match(/const RAW_JS_LESSONS: readonly RawJsLessonSeed\[\] = (\[[\s\S]*?\]);/);
  if (!match || !match[1]) {
    throw new Error('Failed to match RAW_JS_LESSONS in curriculum file');
  }

  const rawList: RawLessonSeed[] = eval(match[1]);
  const map = new Map<number, RawLessonSeed>();
  for (const item of rawList) {
    map.set(item.number, item);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Lesson Files Collector
// ---------------------------------------------------------------------------

interface CollectedLesson {
  lessonNumber: number;
  slug: string;
  title: string;
  arTitle: string;
  summary: string;
  topics: string[];
  difficulty: string;
  files: string[];
  fullMarkdown: string;
  wordCount: number;
  tiptapDoc: TipTapDoc;
}

function collectLessonSource(
  lessonNum: number,
  meta: RawLessonSeed,
  scratchDir: string,
): CollectedLesson {
  const allFiles = fs.readdirSync(scratchDir);

  // Exact regex matching this lesson number: ^js_0?{num}_.*\.md$
  const prefixRegex = new RegExp(`^js_0?${lessonNum}_.*\\.md$`, 'i');
  let matchedFiles = allFiles.filter(f => prefixRegex.test(f));

  // EXPLICIT FILTER: Exclude duplicate file in lesson 54
  matchedFiles = matchedFiles.filter(f => f !== 'js_54_part010.md');

  if (matchedFiles.length === 0) {
    throw new Error(`No source files found for lesson ${lessonNum} in ${scratchDir}`);
  }

  // Sort files naturally by part number
  matchedFiles.sort((a, b) => {
    const ma = a.match(/part0*(\d+)/i) || a.match(/(\d+)\.md$/i);
    const mb = b.match(/part0*(\d+)/i) || b.match(/(\d+)\.md$/i);
    const numA = ma && ma[1] ? parseInt(ma[1], 10) : 0;
    const numB = mb && mb[1] ? parseInt(mb[1], 10) : 0;
    return numA - numB;
  });

  const partsContent: string[] = [];
  for (const fn of matchedFiles) {
    const filePath = path.join(scratchDir, fn);
    const text = fs.readFileSync(filePath, 'utf8');
    partsContent.push(text.trim());
  }

  const fullMarkdown = partsContent.join('\n\n---\n\n');
  const wordCount = fullMarkdown.split(/\s+/).filter(Boolean).length;
  const tiptapDoc = convertMarkdownToTipTapJson(fullMarkdown);

  return {
    lessonNumber: lessonNum,
    slug: meta.slug,
    title: meta.title,
    arTitle: meta.arTitle,
    summary: meta.summary,
    topics: meta.topics || ['JavaScript', 'Frontend'],
    difficulty: meta.difficulty,
    files: matchedFiles,
    fullMarkdown,
    wordCount,
    tiptapDoc,
  };
}

// ---------------------------------------------------------------------------
// Helper: Count Table Nodes in TipTap Document
// ---------------------------------------------------------------------------

function countTableNodes(doc: TipTapDoc): number {
  let count = 0;
  function traverse(node: TipTapNode) {
    if (node.type === 'table') count++;
    if (Array.isArray(node.content)) node.content.forEach(traverse);
  }
  doc.content.forEach(traverse);
  return count;
}

// ---------------------------------------------------------------------------
// Main CLI Runner
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);

  const isDryRun = args.includes('--dry-run');
  const isUpdate = args.includes('--update=true');
  const statusArg = args.find(a => a.startsWith('--status='))?.split('=')[1] || 'DRAFT';
  const targetStatus = statusArg === 'PUBLISHED' ? ContentStatus.PUBLISHED : ContentStatus.DRAFT;

  // 1. Batch Range Configuration (--from, --to, --limit)
  const fromArg = args.find(a => a.startsWith('--from='))?.split('=')[1];
  const toArg = args.find(a => a.startsWith('--to='))?.split('=')[1];
  const limitArg = args.find(a => a.startsWith('--limit='))?.split('=')[1];

  let startNum = fromArg ? parseInt(fromArg, 10) : 1;
  let endNum: number;
  if (toArg) {
    endNum = parseInt(toArg, 10);
  } else if (limitArg) {
    endNum = startNum + parseInt(limitArg, 10) - 1;
  } else {
    endNum = 75;
  }

  // Constrain range between 1 and 75
  startNum = Math.max(1, Math.min(startNum, 75));
  endNum = Math.max(startNum, Math.min(endNum, 75));
  const totalToProcess = endNum - startNum + 1;

  // 2. Configurable Source Directory (--scratchDir="path")
  const scratchDirArg = args.find(a => a.startsWith('--scratchDir=') || a.startsWith('--scratch-dir='));
  let scratchDir = scratchDirArg
    ? scratchDirArg.replace(/^--(scratchDir|scratch-dir)=/, '').replace(/^["']|["']$/g, '')
    : 'C:/Users/rabea/.gemini/antigravity/brain/6dde1a10-4d5d-4b36-9cb1-3fdb92257108/scratch';

  scratchDir = path.resolve(scratchDir);
  if (!fs.existsSync(scratchDir)) {
    throw new Error(`Configured scratch directory does not exist: "${scratchDir}". Please provide a valid directory via --scratchDir="path".`);
  }

  console.log('===========================================================');
  console.log('   Khamsa Programming - JavaScript Curriculum Importer   ');
  console.log('===========================================================');
  console.log(`- Mode:          ${isDryRun ? 'DRY-RUN (READ-ONLY, NO DB CHANGES)' : 'LIVE IMPORT / UPDATE'}`);
  console.log(`- Target Status: ${targetStatus}`);
  console.log(`- Update Mode:   ${isUpdate ? 'CONTENT-ONLY REFRESH' : 'INSERT ONLY (SKIP EXISTING)'}`);
  console.log(`- Lesson Range:  JS-${startNum.toString().padStart(2, '0')} to JS-${endNum.toString().padStart(2, '0')} (${totalToProcess} lessons)`);
  console.log(`- Source Dir:    ${scratchDir}`);
  console.log('-----------------------------------------------------------');

  // 3. Connect to MySQL & retrieve author
  await prisma.$connect();
  console.log('Connected to MySQL via Prisma.');

  const adminAuthor = await prisma.user.findFirst({
    where: {
      OR: [
        { email: 'r.shaban.2016@gmail.com' },
        { role: 'ADMIN' },
      ],
    },
    select: { id: true, name: true, email: true },
  });

  if (!adminAuthor) {
    throw new Error('No author found in database to assign articles to.');
  }
  console.log(`Assigned Author: ${adminAuthor.name} (${adminAuthor.email}) [ID: ${adminAuthor.id}]`);

  // 4. Load Curriculum Metadata
  const curriculumMap = loadCurriculumMetadata();
  console.log(`Loaded ${curriculumMap.size} lessons from curriculum manifest.`);
  console.log(`Processing ${totalToProcess} lessons in numerical sequence...\n`);

  let successCount = 0;
  let skippedCount = 0;
  let failureCount = 0;
  const auditResults: Array<{
    num: number;
    slug: string;
    files: number;
    words: number;
    nodes: number;
    tables: number;
    status: string;
  }> = [];

  for (let num = startNum; num <= endNum; num++) {
    const meta = curriculumMap.get(num);
    if (!meta) {
      console.error(`Lesson ${num} missing in curriculum manifest!`);
      failureCount++;
      continue;
    }

    try {
      const lesson = collectLessonSource(num, meta, scratchDir);

      // Validate TipTap JSON format
      if (!lesson.tiptapDoc || lesson.tiptapDoc.type !== 'doc' || !Array.isArray(lesson.tiptapDoc.content)) {
        throw new Error(`Invalid TipTap document structure for lesson ${num}`);
      }

      // Check and count table nodes inside document
      const tableCount = countTableNodes(lesson.tiptapDoc);

      // Create payload matching createArticleSchema
      const excerpt = lesson.summary.length >= 10
        ? (lesson.summary.length > 490 ? lesson.summary.slice(0, 485) + '...' : lesson.summary)
        : `شرح شامل وعملي لدرس ${lesson.arTitle} في مسار مهندس الواجهات الأمامية.`;

      const payload = {
        title: lesson.arTitle,
        slug: lesson.slug,
        excerpt,
        content: lesson.tiptapDoc as any,
        category: 'توثيق جافاسكريبت',
        tags: ['JavaScript', 'Frontend', 'Web Development', ...(meta.topics || [])],
        status: targetStatus,
        isFeatured: false,
        seo: {
          title: `${lesson.arTitle} | توثيق جافاسكريبت خمسة برمجة`,
          description: excerpt,
          keywords: meta.topics || ['JavaScript'],
        },
      };

      // Validate with Zod
      createArticleSchema.parse(payload);

      // Check existing in DB
      const existing = await prisma.article.findUnique({
        where: { slug: lesson.slug },
        select: { id: true, slug: true, title: true, status: true },
      });

      if (isDryRun) {
        // DRY-RUN ONLY: No DB modification
        const outcome = existing
          ? (isUpdate ? 'WOULD_UPDATE_CONTENT_ONLY' : 'ALREADY_EXISTS_SKIP')
          : 'VALID_NEW_READY';

        auditResults.push({
          num,
          slug: lesson.slug,
          files: lesson.files.length,
          words: lesson.wordCount,
          nodes: lesson.tiptapDoc.content.length,
          tables: tableCount,
          status: outcome,
        });
        successCount++;
        process.stdout.write(`[DRY-RUN] Verified Lesson ${num.toString().padStart(2, '0')}: ${lesson.slug} (${lesson.wordCount} words, ${lesson.tiptapDoc.content.length} nodes, tables: ${tableCount}, action: ${outcome})\n`);
      } else {
        // LIVE IMPORT / UPDATE MODE
        if (existing && !isUpdate) {
          auditResults.push({
            num,
            slug: lesson.slug,
            files: lesson.files.length,
            words: lesson.wordCount,
            nodes: lesson.tiptapDoc.content.length,
            tables: tableCount,
            status: 'SKIPPED_EXISTS',
          });
          skippedCount++;
          console.log(`[SKIP] Lesson ${num}: ${lesson.slug} already exists (use --update=true to override content).`);
          continue;
        }

        if (existing && isUpdate) {
          // CONTENT-ONLY UPDATE: Strictly updates ONLY `content` field.
          // Preserves title, slug, excerpt, category, authorId, status, publishedAt, seo, isFeatured, createdAt.
          await prisma.article.update({
            where: { id: existing.id },
            data: {
              content: payload.content,
            },
          });
          console.log(`[CONTENT UPDATED] Lesson ${num}: ${lesson.slug} (content updated, metadata preserved)`);
        } else {
          // INSERT NEW ARTICLE
          const publishedAt = targetStatus === ContentStatus.PUBLISHED ? new Date() : null;
          await prisma.article.create({
            data: {
              title: payload.title,
              slug: payload.slug,
              excerpt: payload.excerpt,
              content: payload.content,
              category: payload.category,
              tags: payload.tags,
              authorId: adminAuthor.id,
              status: targetStatus,
              isFeatured: false,
              seo: payload.seo,
              publishedAt,
            },
          });
          console.log(`[CREATED] Lesson ${num}: ${lesson.slug} (ID assigned)`);
        }

        auditResults.push({
          num,
          slug: lesson.slug,
          files: lesson.files.length,
          words: lesson.wordCount,
          nodes: lesson.tiptapDoc.content.length,
          tables: tableCount,
          status: existing ? 'CONTENT_UPDATED' : 'INSERTED',
        });
        successCount++;
      }
    } catch (err: any) {
      failureCount++;
      console.error(`[ERROR] Lesson ${num} failed:`, err.message);
      auditResults.push({
        num,
        slug: meta.slug,
        files: 0,
        words: 0,
        nodes: 0,
        tables: 0,
        status: `FAILED: ${err.message}`,
      });
    }
  }

  console.log('\n===========================================================');
  console.log('                    IMPORT AUDIT SUMMARY                   ');
  console.log('===========================================================');
  console.log(`Total Processed:  ${totalToProcess}`);
  console.log(`Success / Valid:  ${successCount}`);
  console.log(`Skipped:          ${skippedCount}`);
  console.log(`Failures:         ${failureCount}`);
  console.log('-----------------------------------------------------------');

  await prisma.$disconnect();
}

if (process.argv[1] && process.argv[1].includes('import-js-docs')) {
  main().catch(async (e) => {
    console.error('Fatal Import Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
}
