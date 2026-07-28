import { describe, it, expect, beforeEach } from 'vitest'
import { isDuplicateSubmission, clearSubmission, _resetDedupeStoreForTests } from '../../api/_lib/dedupe.js'
import { isRateLimited, _resetRateLimitStoreForTests } from '../../api/_lib/rate-limit.js'

describe('isDuplicateSubmission / clearSubmission', () => {
  beforeEach(() => _resetDedupeStoreForTests())

  it('treats the first call for an id as not a duplicate, and the second as a duplicate', () => {
    expect(isDuplicateSubmission('a')).toBe(false)
    expect(isDuplicateSubmission('a')).toBe(true)
  })

  it('ignores falsy or non-string ids (never blocks requests with no id)', () => {
    expect(isDuplicateSubmission(undefined)).toBe(false)
    expect(isDuplicateSubmission(undefined)).toBe(false)
    expect(isDuplicateSubmission('')).toBe(false)
  })

  it('clearSubmission lets a cleared id be reused without being treated as a duplicate', () => {
    expect(isDuplicateSubmission('b')).toBe(false)
    clearSubmission('b')
    expect(isDuplicateSubmission('b')).toBe(false)
  })

  it('clearSubmission on an unknown id is a safe no-op', () => {
    expect(() => clearSubmission('never-seen')).not.toThrow()
  })
})

describe('isRateLimited', () => {
  beforeEach(() => _resetRateLimitStoreForTests())

  it('allows the first 5 calls for an IP and blocks the 6th', () => {
    for (let i = 0; i < 5; i++) expect(isRateLimited('1.2.3.4')).toBe(false)
    expect(isRateLimited('1.2.3.4')).toBe(true)
  })

  it('tracks IPs independently', () => {
    for (let i = 0; i < 5; i++) isRateLimited('1.1.1.1')
    expect(isRateLimited('1.1.1.1')).toBe(true)
    expect(isRateLimited('2.2.2.2')).toBe(false)
  })

  it('never blocks when no IP is available', () => {
    for (let i = 0; i < 10; i++) expect(isRateLimited(null)).toBe(false)
  })
})
