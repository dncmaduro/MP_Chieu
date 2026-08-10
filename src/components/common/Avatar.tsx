import { useState } from "react";

interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: number;
}

export default function Avatar({
  name,
  avatarUrl,
  size = 32,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (fullName: string) => {
    const words = fullName.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  if (avatarUrl && !hasError) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        onError={() => setHasError(true)}
        className="rounded-full object-cover"
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-blue-500 font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

