// Regression coverage for a bug flagged in PR #5 review: the hero H1
// unconditionally rendered its emphasis <span> even when the emphasis
// phrase could not be found inside the heading (e.g. after the two
// content strings drift out of sync), producing a duplicated/corrupted
// heading. splitHeroHeading's `found` flag is what lets the component
// skip rendering the emphasis span in that case.
import { describe, it, expect } from 'vitest'
import { splitHeroHeading } from '../../src/v2/splitHeroHeading.js'

describe('splitHeroHeading', () => {
  it('splits the heading around the emphasis phrase when present', () => {
    const result = splitHeroHeading('Getting you to care, safely and on time.', 'safely and on time')
    expect(result).toEqual({
      before: 'Getting you to care, ',
      emphasis: 'safely and on time',
      after: '.',
      found: true,
    })
  })

  it('falls back to the full heading with an empty emphasis when the phrase is not found', () => {
    const result = splitHeroHeading('Getting you to care, calmly and on time.', 'safely and on time')
    expect(result.found).toBe(false)
    expect(result.before).toBe('Getting you to care, calmly and on time.')
    expect(result.emphasis).toBe('')
    expect(result.after).toBe('')
  })
})
