import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ search, setSearch }) {
  const navigate = useNavigate();

  return (
    <div className="SearchBar">
      <img src="https://api.iconify.design/mdi:magnify.svg" alt="" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`/search/?q=${search}`);
          setSearch("");
        }}
      >
        <input
          type="text"
          value={search}
          placeholder="Search People on FaceBawk"
          onChange={(event) => {
            setSearch(event.currentTarget.value);
          }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
