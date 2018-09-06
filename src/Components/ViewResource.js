import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import moment from 'moment';

import QueryGetResource from "../GraphQL/QueryGetResource";

import ReactGantt from 'gantt-for-react';


class ViewResource extends Component {

    render() {
        const { resource, loading } = this.props;

        return (
            <div className={`ui container raised very padded segment ${loading ? 'loading' : ''}`}>
                <Link to="/" className="ui button">Back to resource list</Link>
                <div className="ui items">
                    <div className="item">
                        {resource && <div className="content">
                            <div className="header">{resource.id}</div>
                            <div className="extra"><i className="icon marker"></i>{moment(resource.email).format('LL')}</div>
                            <div className="extra"><i className="icon marker"></i>{moment(resource.first_name).format('LT')}</div>
                            <div className="extra"><i className="icon marker"></i>{resource.last_name}</div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }

}

const ViewResourceWithData = graphql(
    QueryGetResource,
    {
        options: ({ match: { params: { id } } }) => ({
            variables: { id },
            fetchPolicy: 'cache-and-network',
        }),
        props: ({ data: { getResource: resource, loading} }) => ({
            resource,
            loading,
        }),
    },
)(ViewResource);

export default ViewResourceWithData;
