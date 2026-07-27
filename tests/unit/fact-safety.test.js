// Guards the site's own documented safeguards (see
// src/v2/content/government.js's header comment and
// docs/COMPLETE-EXPERIENCE-AUDIT.md §7): no ALS-provider licensing claim,
// no SBA/8(a)/HUBZone/SDVOSB/VOSB/WOSB/EDWOSB certification claim, no
// HIPAA-compliance claim, and no "guarantee" wording anywhere in rendered
// copy. This scans source text with `//` line comments stripped, so
// comments that *document* these policies (like government.js's own
// header) don't trip the test — only rendered/user-facing strings do.
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SRC = join(import.meta.dirname, '..', '..', 'src')

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full, files)
    else if (['.jsx', '.js'].includes(extname(full))) files.push(full)
  }
  return files
}

function stripComments(text) {
  return text
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
}

const FORBIDDEN = [
  { name: 'HIPAA-compliant claim', pattern: /HIPAA[- ]compliant|compliant with HIPAA|HIPAA certifi/i },
  { name: 'ALS licensing claim (ALS ... licensed/certified/provider)', pattern: /\bALS\b[^.]{0,20}(licensed|licensure|certified|provider)/i },
  { name: 'ALS licensing claim (licensed/certified ... ALS)', pattern: /(licensed|certified)[^.]{0,20}\bALS\b/i },
  { name: 'SBA certification token', pattern: /\bSBA\b/ },
  { name: '8(a) certification token', pattern: /\b8\(a\)\b/ },
  { name: 'HUBZone token', pattern: /\bHUBZone\b/i },
  { name: 'SDVOSB token', pattern: /\bSDVOSB\b/i },
  { name: 'VOSB token', pattern: /\bVOSB\b/i },
  { name: 'WOSB token', pattern: /\bWOSB\b/i },
  { name: 'EDWOSB token', pattern: /\bEDWOSB\b/i },
  { name: '"guarantee" wording', pattern: /\bguarantee[sd]?\b/i },
]

describe('fact safety: no forbidden claims in rendered source', () => {
  const files = walk(SRC)

  for (const { name, pattern } of FORBIDDEN) {
    it(`no file contains: ${name}`, () => {
      const hits = []
      for (const file of files) {
        const raw = readFileSync(file, 'utf8')
        const clean = stripComments(raw)
        if (pattern.test(clean)) hits.push(file.replace(SRC, 'src'))
      }
      expect(hits, `Found "${name}" in: ${hits.join(', ')}`).toEqual([])
    })
  }
})
