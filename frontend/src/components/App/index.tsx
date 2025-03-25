import styles from "./styles.module.css";
import AppRoutes from "../../routes";

function App() {
  return (
    <div className={styles.wrapper}>
      <AppRoutes/>
    </div>
  );
}

export default App;
