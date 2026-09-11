import './logo.css';

/**
 * The Holiday Masti lockup, used exactly as supplied.
 *
 * The file is the white artwork on transparency, so it sits correctly on every
 * dark ground on the site. On the one light surface — the navigation bar once
 * it settles — the same file is inverted rather than swapped, which keeps the
 * mark pixel-identical in shape and avoids shipping two versions that could
 * drift apart.
 *
 * `alt` is empty on purpose: every place this appears, it sits inside a link
 * that already carries the accessible name.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      className={['logo', className].filter(Boolean).join(' ')}
      src="/brand/holiday-masti-logo-white.png"
      alt=""
      width={2048}
      height={682}
      draggable={false}
    />
  );
}
