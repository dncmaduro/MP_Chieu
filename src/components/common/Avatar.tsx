import { useState } from "react";

interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
}

export default function Avatar({ name, avatarUrl }: AvatarProps) {
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
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
      {getInitials(name)}
    </div>
  );
}