import Link from 'next/link';
import Layout from '../components/Layout';

const Index = props => (
  <Layout>
    <div className="jumbotron">
      <h1 className="display-3">NHL Statistics</h1>
      <p className="lead">An unofficial source for NHL statistics.</p>
      <hr className="my-4" />
      <p>Choose your destiny.</p>
      <ul className="lead menu">
        <li className="menu__item">
          <Link href="/teams">
            <a>View all teams</a>
          </Link>
        </li>
        <li className="menu__item">
          <Link href="/players">
            <a>View team rosters</a>
          </Link>
        </li>
        <li className="menu__item">
          <Link href="/leaders">
            <a>View league leaders</a>
          </Link>
        </li>
      </ul>
    </div>
  </Layout>
);

export default Index;
