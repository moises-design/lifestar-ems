// The mission's own final-gate rule is "no capability-statement changes":
// the public download must always be byte-identical to the source-of-truth
// document, never a re-export, re-compression, or edited copy.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..', '..')
const SOURCE = join(ROOT, 'docs', 'source', 'Life_Star_EMS_Capability_Statement.pdf')
const PUBLIC = join(ROOT, 'public', 'documents', 'life-star-ems-capability-statement.pdf')

function md5(path) {
  return createHash('md5').update(readFileSync(path)).digest('hex')
}

describe('capability statement PDF byte-identity', () => {
  it('the public download exactly matches the source-of-truth document', () => {
    expect(md5(PUBLIC)).toBe(md5(SOURCE))
  })
})
