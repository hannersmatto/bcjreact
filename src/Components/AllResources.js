import React, { Component } from "react";
import { Link } from "react-router-dom";

import Amplify, { API, graphqlOperation } from "aws-amplify";

import { graphql, compose, withApollo } from "react-apollo";
import QueryAllResources from "../GraphQL/QueryAllResources";
import MutationDeleteResource from "../GraphQL/MutationDeleteResource";

import moment from "moment";

import { Image } from 'semantic-ui-react'


class AllResources extends Component {

    state = {
        busy: false,
    }

    static defaultProps = {
        resources: [],
        deleteResource: () => null,
    }

    async handleDeleteClick(resource, e) {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete resource ${resource.id}`)) {
            const { deleteResource } = this.props;

            await deleteResource(resource);
        }
    }

    handleSync = async () => {
        const { client } = this.props;
        const query = QueryAllResources;

        this.setState({ busy: true });

        await client.query({
            query,
            fetchPolicy: 'network-only',
        });

        this.setState({ busy: false });
    }

    renderResource = (resource) => (

      <Link to={`/resource/${resource.id}`} className="card orange" key={resource.id}>
          <div className="content">
              <div className="header">{resource.name}</div>
          </div>
          <div className="image">
            <Image src="https://semantic-ui.com/images/avatar2/large/molly.png" size='small'/>
          </div>



          <div className="content">
              <p><i className="icon hooli"></i>{resource.first_name}</p>
              <p><i className="icon hooli"></i>{resource.last_name}</p>
            </div>

            <div className="content extra">
                Currently on Leave
              </div>


            <button className="ui bottom attached button" onClick={this.handleDeleteClick.bind(this, resource)}>
              <i className="trash icon"></i>
              Delete
          </button>
      </Link>

    );

    render() {
        const { busy } = this.state;
        const { resources } = this.props;

        return (
            <div>

            <button className="ui icon right basic button" onClick={this.handleSync} disabled={busy}>
                <i aria-hidden="true" className={`refresh icon ${busy && "loading"}`}></i>
                Sync with Server
            </button>

                <div className="ui link cards">
                    <div className="card green">
                        <Link to="/newResource" className="new-resource content center aligned">
                            <i className="icon add large"></i>
                            <p>Create new bcj Resource</p>
                        </Link>
                    </div>
                    {[].concat(resources).sort((a, b) => a.id.localeCompare(b.id)).map(this.renderResource)}

                </div>


            </div>
        );
    }

  }

export default withApollo(compose(
    graphql(
        QueryAllResources,
        {
            options: {
                fetchPolicy: 'cache-first',
            },
            props: ({ data: { listResources = { items: [] } } }) => ({
                resources: listResources.items
            })
        }
    ),
    graphql(
        MutationDeleteResource,
        {
            options: {
                update: (proxy, { data: { deleteResource } }) => {
                    const query = QueryAllResources;
                    const data = proxy.readQuery({ query });

                    data.listResources.items = data.listResources.items.filter(resource => resource.id !== deleteResource.id);

                    proxy.writeQuery({ query, data });
                }
            },
            props: (props) => ({
                deleteResource: (resource) => {
                    return props.mutate({
                        variables: { id: resource.id },
                        optimisticResponse: () => ({
                          deleteResource: {
                              ...resource, __typename: 'Resource'
                          }
                        }),
                    });
                }
            })
        }
    )
)(AllResources));
