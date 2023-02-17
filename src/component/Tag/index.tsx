import Style from "./Style";

/**标签 */
export default function Tag({
  children,
  onClose,
}: {
  children: JSX.Element | string;
  onClose: () => void;
}) {
  return (
    <Style>
      <div className="tag-content">{children}</div>
      <div className="tag-close" onClick={onClose}></div>
    </Style>
  );
}
