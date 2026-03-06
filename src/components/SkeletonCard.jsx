import "../styles/skeleton.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-text shimmer" />
      <div className="skeleton-text small shimmer" />
    </div>
  );
}
