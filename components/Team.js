const Team = props => {
    const { team, ...extraProps } = props;
    return (
        <div className="col-xs-10 col-sm-6 col-xl-3 mx-auto" style={{ maxWidth: 320 + 'px' }}>
            <div
                className="card border-secondary mb-5"
                style={{ maxWidth: 20 + 'rem', width: 340 + 'px' }}
            >
                <div className="card-header">{team.name}</div>
                <div className="card-body">
                    <h4 className="card-title">Team Info</h4>
                    <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, laboriosam
                        mollitia distinctio sunt, rerum ipsum provident veniam, facilis accusamus
                        nisi modi explicabo veritatis minima. Tempora saepe cumque cupiditate qui
                        veritatis.
                    </p>
                    <a
                        href={team.officialSiteUrl}
                        alt={team.name + ' official site'}
                        target="_blank"
                    >
                        Official Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Team;
