import type { FC, ReactNode } from 'react';

import { wrapper, header, headerHeading, main } from './Layout.css';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={wrapper}>
      <header className={header}>
        <h1 className={headerHeading}>都道府県別の総人口推移グラフ</h1>
      </header>
      <main className={main}>{children}</main>
    </div>
  );
};
