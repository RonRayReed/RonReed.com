/**
 * Business Intel Group logomark: a minimalist geometric "data synthesis"
 * symbol (three connected nodes) paired with the flat sans-serif wordmark,
 * per Business_Intel_Group_Style_Guide (Main Logo Blue #00338D, Segoe UI).
 * No shadows/gradients/rotation, per the guide's prohibited-variants rule.
 */
const MAIN_LOGO_BLUE = "#00338D";

export const BigLogo: React.FC<{ unit: number }> = ({ unit }) => {
  const markSize = unit * 0.062;

  return (
    <div
      style={{
        position: "absolute",
        top: unit * 0.06,
        left: unit * 0.06,
        display: "flex",
        alignItems: "center",
        gap: unit * 0.016,
      }}
    >
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 100 100"
        fill="none"
      >
        <line x1="24" y1="76" x2="50" y2="24" stroke={MAIN_LOGO_BLUE} strokeWidth="6" />
        <line x1="50" y1="24" x2="76" y2="76" stroke={MAIN_LOGO_BLUE} strokeWidth="6" />
        <line x1="24" y1="76" x2="76" y2="76" stroke={MAIN_LOGO_BLUE} strokeWidth="6" />
        <circle cx="50" cy="24" r="11" fill={MAIN_LOGO_BLUE} />
        <circle cx="24" cy="76" r="11" fill={MAIN_LOGO_BLUE} />
        <circle cx="76" cy="76" r="11" fill={MAIN_LOGO_BLUE} />
      </svg>
      <span
        style={{
          fontFamily: '"Segoe UI", Helvetica, Arial, sans-serif',
          fontWeight: 700,
          fontSize: unit * 0.026,
          color: MAIN_LOGO_BLUE,
          letterSpacing: 1,
          whiteSpace: "nowrap",
        }}
      >
        BUSINESS INTEL GROUP
      </span>
    </div>
  );
};
