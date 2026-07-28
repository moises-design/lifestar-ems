// Splits a heading string around an emphasized sub-phrase, both of
// which come from the same content entry so they're normally always in
// sync. Pulled out as a pure function (rather than left inline) so the
// not-found fallback path — where `emphasis` is no longer a substring
// of `heading`, e.g. after an uncoordinated copy edit — can be unit
// tested directly instead of relying on the two strings staying in
// sync in production content.
export function splitHeroHeading(heading, emphasis) {
  const index = heading.indexOf(emphasis)
  if (index < 0) {
    return { before: heading, emphasis: '', after: '', found: false }
  }
  return {
    before: heading.slice(0, index),
    emphasis,
    after: heading.slice(index + emphasis.length),
    found: true,
  }
}
