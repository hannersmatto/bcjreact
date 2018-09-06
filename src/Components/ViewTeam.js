import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import moment from 'moment';

import QueryGetTeam from "../GraphQL/QueryGetTeam";

import ReactGantt from 'gantt-for-react';


class ViewTeam extends Component {

    render() {
        const { team, loading } = this.props;

        return (
            <div className={`ui container raised very padded segment ${loading ? 'loading' : ''}`}>
                <Link to="/" className="ui button">Back to team list</Link>
                <div className="ui items">
                    <div className="item">
                        {team && <div className="content">
                            <div className="header">{team.id}</div>
                            <div className="extra"><i className="icon marker"></i>{moment(team.role_type).format('LL')}</div>
                            <div className="extra"><i className="icon marker"></i>{moment(team.name).format('LT')}</div>
                            <div className="extra"><i className="icon marker"></i>{team.res_id}</div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }

}

const ViewTeamWithData = graphql(
    QueryGetTeam,
    {
        options: ({ match: { params: { id } } }) => ({
            variables: { id },
            fetchPolicy: 'cache-and-network',
        }),
        props: ({ data: { getTeam: team, loading} }) => ({
            team,
            loading,
        }),
    },
)(ViewTeam);

export default ViewTeamWithData;
