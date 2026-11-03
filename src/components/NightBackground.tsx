/**
 * Fond FIXE des écrans sombres (vitrine, connexion) : trame de lignes de
 * texte animée + lueur indigo. Le contenu défile par-dessus.
 */
export function NightBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0b16]">
      <div className="cv-glow absolute inset-0" />
      <div className="cv-lines absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,22,0.9)_0%,rgba(10,11,22,0.45)_35%,rgba(10,11,22,0.3)_60%,rgba(10,11,22,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_45%,transparent_55%,rgba(10,11,22,0.7)_100%)]" />
    </div>
  );
}
