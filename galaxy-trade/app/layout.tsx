import './styles/globals.css';
import { FC, ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Head from 'next/head';
import { Provider } from '@/components/ui/provider';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GalaxyTrade</title>
      </Head>
      <body>
        <Provider>
          <header>
            <Navbar />
          </header>
            <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
