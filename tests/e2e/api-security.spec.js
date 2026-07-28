// Confirms RESEND_API_KEY never reaches the client bundle. This is a
// filesystem check against the production build output, not a browser
// test, so it runs as part of the e2e suite (after `npm run build`,
// per the project's validation order) rather than under Vitest, which
// runs before the build exists on a fresh checkout.
import { test, expect } from '@playwright/test'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..', '..')
const ASSETS_DIR = join(ROOT, 'dist', 'assets')

test('RESEND_API_KEY never appears in the built client bundle', () => {
  const files = readdirSync(ASSETS_DIR).filter((f) => f.endsWith('.js'))
  expect(files.length).toBeGreaterThan(0)

  const offenders = []
  for (const file of files) {
    const contents = readFileSync(join(ASSETS_DIR, file), 'utf-8')
    if (contents.includes('RESEND_API_KEY')) offenders.push(file)
  }
  expect(offenders).toEqual([])
})

test('the server-only /api directory is never emitted into the client build output', () => {
  const files = readdirSync(ASSETS_DIR).filter((f) => f.endsWith('.js'))
  const offenders = []
  for (const file of files) {
    const contents = readFileSync(join(ASSETS_DIR, file), 'utf-8')
    // api/_lib/resend-client.js is the one file that reads RESEND_API_KEY;
    // confirming its distinctive source comment is absent is a stronger
    // signal than grepping for the word "resend" alone, since Supabase's
    // own auth client legitimately exposes an unrelated resend() method.
    if (contents.includes('Email delivery is not configured')) offenders.push(file)
  }
  expect(offenders).toEqual([])
})
