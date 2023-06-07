interface SpinnerProps {
  width?: string | number;
  height?: string | number;
  color?: string;
}

export default function Spinner(props: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: 'auto', background: 'none', display: 'block' }}
      shapeRendering="auto"
      width={props.width || '50%'}
      height={props.height || '50%'}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={props.color || '#64405a'}
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="0.5681818181818182s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}
