import type { NextPage } from "next";
import s from "./index.module.sass";

const LucisDebugPage: NextPage = () => {
  return (
    <section className="lucis-container">

      <div className={`${s.container} section-content`}>
        <h1>Debug Page</h1>

        <div className={s.block}>
          <h3>App</h3>
          <div className={s.content}>
            <table className={s.table}>
              <tr><th>Key:</th><th>Value</th></tr>
              <tr><td>Version (commit id)</td><td>LUCIS_VERSION_COMMIT_ID</td></tr>
              <tr><td>Example</td><td>Example</td></tr>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LucisDebugPage