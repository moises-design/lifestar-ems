import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { gov } from '../v2/content/government'
import { SITE } from '../seo/routeMeta'
import './GovernmentContracting.css'

// ---------- accessible copy-to-clipboard for short identifiers ----------
function CopyButton({ label, value }) {
  const [state, setState] = useState('idle') // idle | copied | failed
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
    setTimeout(() => setState('idle'), 2000)
  }
  return (
    <button
      type="button"
      className="gc-copy"
      onClick={copy}
      aria-label={`Copy ${label} ${value}`}
    >
      {state === 'idle' && 'Copy'}
      {state === 'copied' && 'Copied'}
      {state === 'failed' && 'Select and copy'}
      <span className="gc-visually-hidden" role="status">
        {state === 'copied' ? `${label} copied to clipboard` : ''}
      </span>
    </button>
  )
}

function IdRow({ item }) {
  return (
    <div className="gc-idrow">
      <dt>{item.label}</dt>
      <dd>
        <span className="gc-idvalue">{item.value}</span>
        {item.detail && <span className="gc-iddetail">{item.detail}</span>}
        {item.copy && <CopyButton label={item.label} value={item.value} />}
      </dd>
    </div>
  )
}

// ---------- structured data (page-scoped, verified facts only) ----------
const ORIGIN = SITE.origin
const PAGE_URL = `${ORIGIN}${gov.route}`
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${ORIGIN}/#organization`,
      name: 'Life Star EMS Inc.',
      legalName: 'Life Star EMS Inc.',
      url: `${ORIGIN}/`,
      foundingDate: '2009',
      naics: '621910',
      telephone: '+1-956-309-3052',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2526 W Freddy Gonzalez Dr',
        addressLocality: 'Edinburg',
        addressRegion: 'TX',
        postalCode: '78539',
        addressCountry: 'US',
      },
      identifier: [
        { '@type': 'PropertyValue', propertyID: 'UEI', value: 'FTFKVKQ5VVU8' },
        { '@type': 'PropertyValue', propertyID: 'CAGE', value: '5QX65' },
        { '@type': 'PropertyValue', propertyID: 'Texas DSHS EMS Provider', value: '1000256' },
      ],
    },
    {
      '@type': 'Service',
      name: 'EMS and medical transportation services for public agencies',
      serviceType: 'Ambulance and medical transportation services',
      provider: { '@id': `${ORIGIN}/#organization` },
      areaServed: 'South Texas',
      url: PAGE_URL,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Government Contracting', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: gov.faq.items.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ---------- inquiry form ----------
function InquiryForm() {
  const blank = {
    name: '', organization: '', agencyType: '', email: '', phone: '',
    solicitation: '', service: '', location: '', dates: '', message: '',
    wantsPdf: false, contactMethod: 'Email', website: '', // website = honeypot
  }
  const [form, setForm] = useState(blank)
  const [status, setStatus] = useState('idle')
  const set = e => {
    const { name, type, checked, value } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async e => {
    e.preventDefault()
    if (form.website) return // honeypot: silently drop bot submissions
    setStatus('sending')
    try {
      const message = [
        'GOVERNMENT CONTRACTING INQUIRY',
        `Organization: ${form.organization}`,
        `Type: ${form.agencyType}`,
        `Solicitation: ${form.solicitation || 'n/a'}`,
        `Service: ${form.service}`,
        `Location: ${form.location || 'n/a'}`,
        `Dates: ${form.dates || 'n/a'}`,
        `Capability statement requested: ${form.wantsPdf ? 'yes' : 'no'}`,
        `Preferred contact: ${form.contactMethod}`,
        `Message: ${form.message}`,
      ].join(' | ')
      const { error } = await supabase.from('contact_submissions').insert([
        { name: form.name, phone: form.phone, email: form.email, message, created_at: new Date().toISOString() },
      ])
      if (error) throw error
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="gc-form-success" role="status">
        <h3>{gov.inquiry.successHeading}</h3>
        <p>{gov.inquiry.successLine}</p>
        <a href={gov.contact.phoneHref} className="v2-btn v2-btn-secondary">
          {gov.contact.phoneLabel}: {gov.contact.phoneDisplay}
        </a>
      </div>
    )
  }

  return (
    <form className="gc-form" onSubmit={submit}>
      {/* honeypot: hidden from real users, filled only by bots */}
      <div className="gc-visually-hidden" aria-hidden="true">
        <label htmlFor="gc-website">Leave this field empty</label>
        <input id="gc-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set} />
      </div>

      <div className="gc-form-row">
        <div className="gc-field">
          <label htmlFor="gc-name">Name *</label>
          <input id="gc-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={set} />
        </div>
        <div className="gc-field">
          <label htmlFor="gc-org">Organization *</label>
          <input id="gc-org" name="organization" type="text" autoComplete="organization" required value={form.organization} onChange={set} />
        </div>
      </div>

      <div className="gc-form-row">
        <div className="gc-field">
          <label htmlFor="gc-type">Agency or company type *</label>
          <select id="gc-type" name="agencyType" required value={form.agencyType} onChange={set}>
            <option value="">Select...</option>
            {gov.inquiry.agencyTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="gc-field">
          <label htmlFor="gc-service">Service needed *</label>
          <select id="gc-service" name="service" required value={form.service} onChange={set}>
            <option value="">Select...</option>
            {gov.inquiry.services.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="gc-form-row">
        <div className="gc-field">
          <label htmlFor="gc-email">Email *</label>
          <input id="gc-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={set} />
        </div>
        <div className="gc-field">
          <label htmlFor="gc-phone">Phone</label>
          <input id="gc-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} />
        </div>
      </div>

      <div className="gc-form-row">
        <div className="gc-field">
          <label htmlFor="gc-sol">Opportunity or solicitation number</label>
          <input id="gc-sol" name="solicitation" type="text" value={form.solicitation} onChange={set} />
        </div>
        <div className="gc-field">
          <label htmlFor="gc-loc">Performance location</label>
          <input id="gc-loc" name="location" type="text" placeholder="City, county, or venue" value={form.location} onChange={set} />
        </div>
      </div>

      <div className="gc-field">
        <label htmlFor="gc-dates">Estimated service dates</label>
        <input id="gc-dates" name="dates" type="text" placeholder="e.g. Fall 2026 season" value={form.dates} onChange={set} />
      </div>

      <div className="gc-field">
        <label htmlFor="gc-msg">Message *</label>
        <textarea id="gc-msg" name="message" rows={5} required value={form.message} onChange={set} />
      </div>

      <div className="gc-form-row gc-form-row-options">
        <label className="gc-check">
          <input type="checkbox" name="wantsPdf" checked={form.wantsPdf} onChange={set} />
          Email me the capability statement
        </label>
        <div className="gc-field gc-field-compact">
          <label htmlFor="gc-method">Preferred contact method</label>
          <select id="gc-method" name="contactMethod" value={form.contactMethod} onChange={set}>
            {gov.inquiry.contactMethods.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {status === 'error' && <p className="gc-form-error" role="alert">{gov.inquiry.errorLine}</p>}
      <button type="submit" className="v2-btn v2-btn-primary gc-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}

// ---------- page ----------
export default function GovernmentContracting() {
  const c = gov
  return (
    <div className="v2 gc">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1 · Procurement hero */}
      <section className="gc-hero" aria-labelledby="gc-h1">
        <div className="v2-container">
          <nav className="gc-crumbs v2-small" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Government Contracting</span>
          </nav>
          <span className="v2-label">{c.hero.label}</span>
          <h1 id="gc-h1" className="gc-h1">{c.hero.heading}</h1>
          <p className="v2-lead gc-hero-lead">{c.hero.lead}</p>
          <div className="gc-hero-btns">
            <a href={c.pdfPublicPath} download className="v2-btn v2-btn-primary">{c.hero.downloadLabel}</a>
            <a href={`#${c.inquiry.id}`} className="v2-btn v2-btn-secondary">{c.hero.inquiryLabel}</a>
            <a href={`#${c.identifiers.id}`} className="gc-quiet-link">{c.hero.identifiersLinkLabel}</a>
          </div>

          <dl className="gc-identity" aria-label="Key procurement identifiers">
            {c.identityPanel.map(item => (
              <div key={item.label + item.value} className="gc-identity-item">
                <dt>{item.label}</dt>
                <dd>
                  <span className="gc-idvalue">{item.value}</span>
                  {item.copy && <CopyButton label={item.label} value={item.value} />}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2 · Contracting overview */}
      <section className="v2-section v2-hairline-top" aria-labelledby="gc-ov-h">
        <div className="v2-container gc-split">
          <div>
            <span className="v2-label">{c.overview.label}</span>
            <h2 id="gc-ov-h" className="gc-h2">{c.overview.heading}</h2>
            <p className="v2-lead">{c.overview.body}</p>
          </div>
          <div className="gc-buyers v2-panel">
            <h3 className="gc-buyers-title">Who we work with</h3>
            <ul className="gc-plainlist">
              {c.overview.buyers.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · Core capabilities */}
      <section className="v2-section v2-hairline-top" aria-labelledby="gc-cap-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{c.capabilities.label}</span>
            <h2 id="gc-cap-h">{c.capabilities.heading}</h2>
          </div>
          <div className="gc-cap-grid">
            {c.capabilities.groups.map(g => (
              <div key={g.title} className="gc-cap-card">
                <h3 className="gc-card-title">{g.title}</h3>
                <ul className="gc-plainlist">
                  {g.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="gc-note v2-small">{c.capabilities.note}</p>
        </div>
      </section>

      {/* 4 · Differentiators */}
      <section className="v2-section v2-hairline-top" aria-labelledby="gc-diff-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{c.differentiators.label}</span>
            <h2 id="gc-diff-h">{c.differentiators.heading}</h2>
          </div>
          <ul className="gc-diff-grid">
            {c.differentiators.items.map(d => <li key={d} className="gc-diff-item">{d}</li>)}
          </ul>
        </div>
      </section>

      {/* 5 · Representative experience */}
      <section className="v2-section v2-hairline-top" aria-labelledby="gc-exp-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{c.experience.label}</span>
            <h2 id="gc-exp-h">{c.experience.heading}</h2>
          </div>
          <div className="gc-split">
            <div className="gc-exp-col">
              <h3 className="gc-card-title">Schools, universities, and community events</h3>
              <ul className="gc-plainlist">
                {c.experience.schools.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="gc-exp-col">
              <h3 className="gc-card-title">Response operations</h3>
              <ul className="gc-plainlist">
                {c.experience.operations.map(o => <li key={o}>{o}</li>)}
              </ul>
            </div>
          </div>
          <p className="gc-note v2-small">{c.experience.note}</p>
        </div>
      </section>

      {/* 6 · Identifiers and codes */}
      <section className="v2-night v2-section" id={c.identifiers.id} aria-labelledby="gc-id-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{c.identifiers.label}</span>
            <h2 id="gc-id-h">{c.identifiers.heading}</h2>
          </div>
          <div className="gc-id-grid">
            <div className="gc-id-card">
              <h3 className="gc-card-title">Corporate</h3>
              <dl>{c.identifiers.corporate.map(i => <IdRow key={i.label} item={i} />)}</dl>
              <p className="gc-id-qualifier v2-small">{c.identifiers.ownershipNote}</p>
            </div>
            <div className="gc-id-card">
              <h3 className="gc-card-title">Registrations</h3>
              <dl>{c.identifiers.registrations.map(i => <IdRow key={i.label + i.value} item={i} />)}</dl>
            </div>
            <div className="gc-id-card">
              <h3 className="gc-card-title">NAICS and PSC codes</h3>
              <dl>{c.identifiers.codes.map(i => <IdRow key={i.label + i.value} item={i} />)}</dl>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Operational readiness */}
      <section className="v2-section" aria-labelledby="gc-ready-h">
        <div className="v2-container gc-split">
          <div>
            <span className="v2-label">{c.readiness.label}</span>
            <h2 id="gc-ready-h" className="gc-h2">{c.readiness.heading}</h2>
          </div>
          <ul className="gc-ready-list">
            {c.readiness.items.map(r => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </section>

      {/* 8 · Who we support */}
      <section className="v2-section v2-hairline-top" aria-labelledby="gc-sup-h">
        <div className="v2-container">
          <div className="v2-section-head">
            <span className="v2-label">{c.support.label}</span>
            <h2 id="gc-sup-h">{c.support.heading}</h2>
          </div>
          <ul className="gc-diff-grid">
            {c.support.items.map(s => <li key={s} className="gc-diff-item">{s}</li>)}
          </ul>
        </div>
      </section>

      {/* 9 · Capability statement download */}
      <section className="v2-section v2-hairline-top" id={c.download.id} aria-labelledby="gc-dl-h">
        <div className="v2-container gc-split">
          <div>
            <span className="v2-label">{c.download.label}</span>
            <h2 id="gc-dl-h" className="gc-h2">{c.download.heading}</h2>
            <p className="v2-lead">{c.download.line}</p>
            <p className="gc-note v2-small">{c.download.disclaimer}</p>
          </div>
          <div className="gc-doc-card v2-panel">
            <div className="gc-doc-sheet" aria-hidden="true">
              <img src="/icon-192.png" alt="" />
              <span className="gc-doc-sheet-title">LIFE STAR EMS INC.</span>
              <span className="gc-doc-sheet-sub">Capability Statement</span>
            </div>
            <div className="gc-doc-body">
              <h3 className="gc-card-title">{c.pdfTitle}</h3>
              <p className="v2-small gc-doc-meta">{c.pdfMeta}</p>
              <div className="gc-doc-btns">
                <a href={c.pdfPublicPath} download className="v2-btn v2-btn-primary">Download PDF</a>
                <a href={c.pdfPublicPath} target="_blank" rel="noreferrer" className="v2-btn v2-btn-secondary">
                  {c.download.openLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 + 11 · Contact and inquiry form */}
      <section className="v2-section v2-hairline-top" id={c.inquiry.id} aria-labelledby="gc-inq-h">
        <div className="v2-container gc-inq-grid">
          <div>
            <span className="v2-label">{c.inquiry.label}</span>
            <h2 id="gc-inq-h" className="gc-h2">{c.inquiry.heading}</h2>
            <p className="v2-lead gc-inq-lead">{c.inquiry.line}</p>

            <div className="gc-contact-card v2-panel">
              <h3 className="gc-card-title">{c.contact.phoneLabel}</h3>
              <p className="gc-contact-name">{c.contact.name}, {c.contact.title}<br />{c.contact.company}</p>
              <a href={c.contact.phoneHref} className="gc-contact-line">{c.contact.phoneDisplay}</a>
              <a href={`mailto:${c.contact.email}`} className="gc-contact-line gc-contact-email">{c.contact.email}</a>
              <p className="gc-contact-addr">
                {c.contact.addressLines.map(l => <span key={l}>{l}<br /></span>)}
              </p>
              <div className="gc-dispatch">
                <h4 className="gc-dispatch-title">{c.contact.dispatchLabel}</h4>
                <a href={c.contact.dispatchHref} className="gc-contact-line">{c.contact.dispatchDisplay}</a>
                <p className="v2-small gc-dispatch-note">{c.contact.dispatchNote}</p>
              </div>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      {/* 12 · FAQ */}
      <section className="v2-section v2-hairline-top" aria-labelledby="gc-faq-h">
        <div className="v2-container-text gc-faq-wrap">
          <div className="v2-section-head">
            <span className="v2-label">{c.faq.label}</span>
            <h2 id="gc-faq-h">{c.faq.heading}</h2>
          </div>
          <div className="gc-faq">
            {c.faq.items.map(item => (
              <details key={item.q} className="gc-faq-item">
                <summary className="gc-faq-q">{item.q}</summary>
                <p className="gc-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13 · Final CTA */}
      <section className="v2-night v2-section-dense" aria-labelledby="gc-cta-h">
        <div className="v2-container gc-final">
          <div>
            <h2 id="gc-cta-h" className="gc-h2">{c.finalCta.heading}</h2>
            <p className="v2-lead">{c.finalCta.line}</p>
          </div>
          <div className="gc-final-btns">
            <a href={c.contact.phoneHref} className="v2-btn v2-btn-primary">
              {c.contact.phoneLabel.split(' and ')[0]}: {c.contact.phoneDisplay}
            </a>
            <a href={c.pdfPublicPath} download className="v2-btn v2-btn-secondary">{c.hero.downloadLabel}</a>
            <p className="v2-small gc-final-dispatch">
              {c.contact.dispatchLabel}: <a href={c.contact.dispatchHref}>{c.contact.dispatchDisplay}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
