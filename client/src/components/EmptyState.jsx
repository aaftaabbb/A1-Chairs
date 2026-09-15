import { Link } from 'react-router-dom';

const EmptyState = ({ title = 'Nothing here yet', message = 'Check back soon!', action, to }) => (
  <div className="text-center py-20 px-4">
    <span className="font-display italic text-3xl text-ink-300">"{title}"</span>
    <p className="mt-4 text-sm text-ink-400 max-w-sm mx-auto leading-relaxed">{message}</p>
    <div className="mt-7">
      {action}
      {to && (
        <Link to={to} className="btn-primary mx-auto">Explore</Link>
      )}
    </div>
  </div>
);

export default EmptyState;