// Builds the HTML and plain-text notification email bodies from a
// FORM_CONFIGS entry and its validated data. Kept framework-agnostic
// and free of any Resend/network code so it's independently testable.

import { escapeHtml } from './validate.js'

function formatValue(value, field) {
  if (field.type === 'checkbox') return value ? 'Yes' : 'No'
  return value || '(not provided)'
}

export function renderHtmlEmail({ config, data, submittedAt, source }) {
  const rows = config.fields.map((field) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#0f172a;white-space:nowrap;vertical-align:top;">${escapeHtml(field.label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;white-space:pre-wrap;">${escapeHtml(formatValue(data[field.key], field))}</td>
    </tr>`).join('')

  return `
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f4f2;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0b3a5b;padding:20px 24px;">
        <h1 style="margin:0;font-size:18px;color:#ffffff;">${escapeHtml(config.subject)}</h1>
      </div>
      <div style="padding:16px 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows}
        </table>
        <p style="margin:20px 0 4px;font-size:13px;color:#64748b;">Submitted: ${escapeHtml(submittedAt)}</p>
        <p style="margin:0;font-size:13px;color:#64748b;">Source: ${escapeHtml(source)}</p>
      </div>
    </div>
  </body>
</html>`
}

export function renderTextEmail({ config, data, submittedAt, source }) {
  const lines = config.fields.map((field) => `${field.label}: ${formatValue(data[field.key], field)}`)
  lines.push('', `Submitted: ${submittedAt}`, `Source: ${source}`)
  return lines.join('\n')
}
