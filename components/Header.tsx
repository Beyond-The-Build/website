import { CustomPortableText } from "@/components/CustomPortableText";
import type { PortableTextBlock } from "next-sanity";
import type { PathSegment } from "sanity";

interface HeaderProps {
  id: string | null;
  type: string | null;
  path: PathSegment[];
  centered?: boolean;
  description?: PortableTextBlock[] | null;
  title?: string | null;
}
export function Header(props: HeaderProps) {
  const { id, type, path, title, description, centered = false } = props;
  if (!description && !title) {
    return null;
  }
  return (
    <div className={`${centered ? "text-center" : "w-5/6 lg:w-3/5"}`}>
      {/* Title */}
      {title && (
        <div className="text-4xl">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div>
          <CustomPortableText
            id={id}
            type={type}
            path={path}
            value={description}
          />
        </div>
      )}
    </div>
  );
}
