const Button = ({ currentPage, stat, handlePage, page }) => {
  return (
    <button
      onClick={handlePage}
      disabled={currentPage === page}
      className={`px-4 py-2 rounded-md ${
        currentPage === page
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm"
      }`}
    >
      {stat}
    </button>
  );
};

export default Button;
