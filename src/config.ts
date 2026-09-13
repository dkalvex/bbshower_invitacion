/**
 * GitHub Pages is a static host, so RSVP answers need an external collector.
 * Fill this in with a Google Form to receive confirmations in a spreadsheet:
 *   action: the form URL ending in /formResponse
 *   campos: the entry.XXXX id of each question
 * While it is null, confirmations are only stored in the visitor's browser.
 */
export type GoogleFormConfig = {
  action: string
  campos: {
    nombre: string
    telefono: string
    apuesta: string
    mensaje: string
  }
}

export const GOOGLE_FORM: GoogleFormConfig | null = {
  action:
    'https://docs.google.com/forms/d/e/1FAIpQLScpJ7s5_g6xzs82LNTvnG1WyETZDDGzTedZMg4kThhGIDOFeg/formResponse',
  campos: {
    nombre: 'entry.2027861883',
    telefono: 'entry.1415831814',
    apuesta: 'entry.1672418830',
    mensaje: 'entry.1877348384',
  },
}

export const RSVP_STORAGE_KEY = 'rsvp-orlando-mary'
