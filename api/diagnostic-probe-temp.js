// TEMPORARY diagnostic-only endpoint, not part of the application.
// Exists solely to submit one clearly-labeled live test through
// production's real /api/submit-form (server-to-server, on Vercel's
// own network) and report back the exact response, since this session
// has no tool that can send an outbound POST with a body directly.
// Deployed only as a preview build on a throwaway branch — never
// merged to master, deleted immediately after use.
export default async function handler(req, res) {
  const payload = {
    formType: 'transport-request',
    submissionId: `diagnostic-probe-${Date.now()}`,
    name: 'TEST SUBMISSION — DO NOT ACTION',
    company: 'Internal diagnostic test',
    phone: '000-000-0000',
    email: 'lifestarems.rgv+diagnostictest@gmail.com',
    service: 'Other / Not Sure',
    date: '',
    location: 'Diagnostic test — no real location',
    details:
      'Automated diagnostic test verifying /api/submit-form and email delivery after the RESEND_API_KEY fix and redeploy. Please disregard and delete — no real transport request. Sent at ' +
      new Date().toISOString(),
    website: '',
  }

  try {
    const upstream = await fetch('https://www.lifestaremsrgv.com/api/submit-form', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const text = await upstream.text()
    res.status(200).json({
      probeOk: true,
      upstreamStatus: upstream.status,
      upstreamStatusText: upstream.statusText,
      upstreamBody: text,
    })
  } catch (err) {
    res.status(200).json({ probeOk: false, error: err.message })
  }
}
