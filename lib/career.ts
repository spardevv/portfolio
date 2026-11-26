/** Início da carreira em tecnologia (Datweb Sistemas, 02/2020). */
export const CAREER_START = new Date(2020, 1, 1);

/** Anos completos de experiência desde o início da carreira. */
export function yearsOfExperience(now = new Date()) {
  const ms = now.getTime() - CAREER_START.getTime();
  return Math.max(1, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
}

/** Troca o marcador {years} de um texto pelos anos de experiência. */
export function withYears(text: string) {
  return text.replaceAll("{years}", String(yearsOfExperience()));
}
