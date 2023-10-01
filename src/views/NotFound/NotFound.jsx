import styles from "./NotFound.module.css";
export function NotFound() {
  return (
    <div className={styles.box}>
      <h1>
        You seems lost, maybe you could
        <button
          autoFocus
          onClick={() => {
            window.location.href = "#/index";
          }}
        >
          <a href="#/index">To my homepage</a>
        </button>
        !
      </h1>
      <h2>
        Or you could try our new feature:
        <a href="#/experiment">to experimental page</a>
      </h2>
    </div>
  );
}
