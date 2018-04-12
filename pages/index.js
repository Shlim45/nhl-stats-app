import Layout from '../components/Layout';
import Link from 'next/link';

const Index = props => (
    <Layout>
        <div>
            <h1 className="mb-5">NHL Statistics</h1>
            <h3>An unofficial source for NHL statistics.</h3>
            <ul className="menu">
                <li className="menu__item"><Link href="/teams"><a>View all teams</a></Link></li>
                <li className="menu__item"><Link href="/players"><a>View team rosters</a></Link></li>
                <li className="menu__item"><Link href="/leaders"><a>View league leaders</a></Link></li>
            </ul>
        </div>
    </Layout>
);

export default Index;