const Pagination = ({
  counter,
  limit,
  setCounter,
  skip,
  setSkip,
  totalPage,
}) => {
  return (
    <section className="pagination">
      <div>
        <button
          className={counter === 1 ? "hidden" : ""}
          onClick={() => {
            setCounter(counter - 1);
            setSkip(skip - limit);
          }}
        >
          Page précèdente
        </button>
        <p>
          Page : {counter} / {totalPage}
        </p>
        <div>
          <button
            className={counter === totalPage ? "hidden" : ""}
            onClick={() => {
              setCounter(counter + 1);
              setSkip(skip + limit);
            }}
          >
            Page suivante
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="number">Aller à la page</label>
        <input
          type="number"
          id="number"
          onChange={(event) => {
            if (event.target.value > 0 && event.target.value <= totalPage) {
              setCounter(Number(event.target.value));
              setSkip((event.target.value - 1) * limit);
            }
          }}
        />
      </div>
    </section>
  );
};

export default Pagination;
