/**
 * Business Intel Group "bi" monogram (bowl-and-dot lowercase mark),
 * reconstructed as SVG from the brand's logo files. `variant` picks
 * black (for light backgrounds) or white (for dark backgrounds).
 */
export const BiLogo: React.FC<{ unit: number; variant: "dark" | "light" }> = ({
  unit,
  variant,
}) => {
  const fill = variant === "dark" ? "#000000" : "#ffffff";
  const size = unit * 0.07;

  return (
    <div style={{ position: "absolute", top: unit * 0.06, left: unit * 0.06 }}>
      <svg width={size} height={size * 0.9} viewBox="0 0 80 72" fill="none">
        {/* b: ascender stem + ring bowl */}
        <rect x="13" y="8" width="9" height="56" fill={fill} />
        <circle
          cx="30"
          cy="46"
          r="12.5"
          stroke={fill}
          strokeWidth="9"
          fill="none"
        />
        {/* i: x-height stem + dot */}
        <rect x="53" y="30" width="9" height="34" fill={fill} />
        <circle cx="57.5" cy="14" r="5.5" fill={fill} />
      </svg>
    </div>
  );
};
