export function Button({ onClick, children, className }) {
    return (
      <button
        onClick={onClick}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${className}`}
      >
        {children}
      </button>
    );
  }