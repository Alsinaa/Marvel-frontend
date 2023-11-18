const ResearchBar = ({ setName, setCounter, setSkip }) => {
  return (
    <section className="search">
      <div>
        <input
          className="character-search"
          type="text"
          placeholder="ex: Thor"
          onChange={(event) => {
            setName(event.target.value);
            setCounter(1);
            setSkip(0);
          }}
        />
      </div>
    </section>
  );
};
export default ResearchBar;
