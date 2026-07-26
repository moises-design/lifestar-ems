// ============================================================
// Life Star in the Community — curated Facebook media.
//
// This file is the single data source for the homepage community
// showcase. Add REAL, owner-approved Facebook posts only. Never
// invent posts, captions, or dates; never paste access tokens here.
//
// How to add a post:
// 1. Open the post on facebook.com/LifeStarEMSRGV and copy its URL.
// 2. Save an approved image or video poster frame into
//    public/images/community/ (compressed, no third-party faces
//    without permission).
// 3. Add an entry below. The first entry with `featured: true`
//    becomes the large editorial card; the next ones fill the rail
//    (three to six recommended).
//
// While this list is EMPTY the section automatically falls back to
// the live Facebook Page timeline (official embed, loaded when the
// section approaches the viewport).
//
// Field reference:
// {
//   postUrl:  'https://www.facebook.com/LifeStarEMSRGV/posts/...',
//   mediaType: 'photo' | 'video',
//   image: '/images/community/example.jpg',   // photo, or video poster
//   width: 1200, height: 900,                 // intrinsic size of `image`
//   videoUrl: 'https://www.facebook.com/LifeStarEMSRGV/videos/...',
//             // only for mediaType 'video'; played via Facebook's
//             // official video embed after the visitor presses play
//   caption: 'Exact or excerpted caption from the real post.',
//   date: '2026-07-01',                       // ISO date of the post
//   alt: 'Descriptive alt text for the image.',
//   featured: true,
// }
// ============================================================

export const facebookPosts = []

export const hasCuratedPosts = facebookPosts.length > 0

export function featuredPost() {
  return facebookPosts.find(p => p.featured) || facebookPosts[0] || null
}

export function supportingPosts(max = 6) {
  const feat = featuredPost()
  return facebookPosts.filter(p => p !== feat).slice(0, max)
}
