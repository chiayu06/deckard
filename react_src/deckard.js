var queryURL = 'http://localhost:8079/api/query';

var Deckard = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {page: "dashboard", thresholds: [
            {time: 30, color: "success"}, 
            {time: 600, color: "warning"}, 
            {time: 3600, color: "danger"}
        ]}
    },
    componentDidMount: function() {
    },
    handleSelect(selectedKey) {
        console.log('selected ' + selectedKey);
        this.setState({page: selectedKey});
    },
    render: function() {
        var contents = (<p>Loading...</p>);
        switch (this.state.page) {
        case "dashboard":
            contents = (
                <Dashboard valueLink={this.linkState('thresholds')}/>
            );
            break;
        case "config":
            contents = (
                <ConfigDashboard />
            );
            break;
        }

        return (
            <div className="deckard">
            <h1>Status Dashboard</h1>
            <div className="row">
                <div className='col-md-2'>
                    <ReactBootstrap.Nav bsStyle='pills' stacked activeKey={this.state.page} onSelect={this.handleSelect}>
                        <ReactBootstrap.NavItem eventKey={"dashboard"}>Dashboard</ReactBootstrap.NavItem>
                        <ReactBootstrap.NavItem eventKey={"config"}>Config</ReactBootstrap.NavItem>
                    </ReactBootstrap.Nav>
                    <br />
                    <Panel header="Welcome to Deckard" bsStyle="info">
                        <p>Deckard is a real-time status dashboard</p>

                        <p>
                        Rows are generated from a "view", which is a server-configured Metadata query against
                        the archiver. You can refine this query by typing in the query bar at the top and hitting "Query".
                        The contents of the query bar should be formatted as a "where-clause", and will be added
                        to the server-configured query. Syntax for the query language and where-clause can be
                        found <a href="https://gtfierro.github.io/giles/interface/#querylang">here</a>.
                        </p>

                        <p>
                        Click on any row to view the Metadata for that timeseries. Clicking "Plot" will open a new window
                        on the BtrDB plotter.
                        </p>

                        <p>
                        Rows are not sorted by default, but you can click on the headers multiple times to sort ascending
                        or descending by that column.
                        </p>

                    </Panel>
                </div>
                <div className='col-md-10'>
                    {contents}
                </div>
            </div>
            </div>
        );
    }
});

React.render(
    <Deckard />,
    document.getElementById('content')
);
