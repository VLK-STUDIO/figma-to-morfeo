const { widget } = figma;
const { AutoLayout, SVG } = widget;

type Props = {
  width?: number;
  height?: number;
} & Omit<FrameProps, "width" | "height">;

export function DeleteButton({ width = 41, height = 41, ...props }: Props) {
  return (
    <AutoLayout
      width={width}
      height={height}
      name="DeleteButton"
      opacity={0}
      hoverStyle={{ opacity: 1 }}
      fill={{
        type: "solid",
        color: { r: 0.5, g: 0.5, b: 0.5, a: 1 },
        visible: true,
      }}
      tooltip="Delete this variant and all related component instances"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      {...props}
    >
      <SVG
        src={`
          <svg width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11 10V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 5H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 8V16C3 17.6569 4.34315 19 6 19H12C13.6569 19 15 17.6569 15 16V8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 3C6 1.89543 6.89543 1 8 1H10C11.1046 1 12 1.89543 12 3V5H6V3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `}
      />
    </AutoLayout>
  );
}
