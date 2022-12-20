import "./SearchBar.css";

function SearchBar({ setSearch }) {
  return (
    <div className="SearchBar">
      <img
        src="https://api.iconify.design/mdi:magnify.svg"
        alt=""
        onChange={(event) => {
          setSearch(event.currentTarget.value);
        }}
      />
      <input type="text" placeholder="Search FaceBawk" />
    </div>
  );
}

export default SearchBar;
