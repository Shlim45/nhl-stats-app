import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light mb-4">
        <div className="container">
            <Link href="/">
                <a href="#" className="navbar-brand">
                    NHL Statistics
                </a>
            </Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/">
                            <a className="nav-link">Home</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/teams">
                            <a className="nav-link">Teams</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/players">
                            <a className="nav-link">Players</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/leaders">
                            <a className="nav-link">Leaders</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;
