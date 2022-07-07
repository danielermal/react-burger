import React, { FC } from "react";
import styles from "./styles.module.css";

export const NotFound: FC = () => {
  return (
    <section className={styles.section_not_found}>
      <h1 className={`${styles.h1} ${styles.h1_not_found}`}>Извините, такого адреса не существует</h1>
      <img className={styles.img_not_found} src="https://ru-static.z-dn.net/files/daf/7dfaa54b44128fa8a781a049c1bbe0ba.jpg" alt=" грустный котик" />
    </section>
  );
};
