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
            <style jsx>{`
                .menu {
                    display: flex;
                    list-style: none;
                    justify-content: center;
                    margin: 5rem;
                }
                .menu__item {
                    width: 30%;
                    height: 10vh;
                }
                @media screen and (max-width: 800px) {
                    .menu {
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        margin: 2rem;
                    }
                    .menu__item {
                        width: 80%;
                        height: 10vh;
                    }
                }
                
            `}</style>
        </div>
    </Layout>
);

export default Index;