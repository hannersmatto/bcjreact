import React, { Component } from "react";
import { Link } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { graphql } from "react-apollo";
import QueryAllResources from "../GraphQL/QueryAllResources";
import QueryGetResource from "../GraphQL/QueryGetResource";
import MutationCreateResource from "../GraphQL/MutationCreateResource";

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { nearest15min } from "../Utils";
import DateTimePickerCustomInput from "./DateTimePickerCustomInput";
import AudioRecorder from 'react-audio-recorder';

class NewResource extends Component {

    static defaultProps = {
        createResource: () => null,
    }

    state = {
        resource: {

          res_id: '',
          res_code:'',
          job_title:'',
          email:'',
          phone_work:'',
          phone_home:'',
          phone_mobile:'',
          date_created:'',
          profile_type:'',
          res_type:'',
          is_licensed:'',
          first_name:'',
          last_name:'',
          is_active:'',
          date_connected:'',
          group_count:'',
          identity_provider:'',
            }
    };

    handleChange(field, { target: { value } }) {
        const { resource } = this.state;

        resource[field] = value;

        this.setState({ resource });
    }

    handleDateChange(field, value) {
        this.handleChange(field, { target: { value: value.format() } });
    }

    handleSave = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const { createResource, history } = this.props;
        const { resource } = this.state;

        await createResource({ ...resource });

        history.push('/resources');
    }



    render() {
        const { resource } = this.state;

        return (

            <div className="ui container raised very padded segment">
                <h1 className="ui header">Create a BCJ Resource</h1>
                <div className="ui form">
                    <div className="field required eight wide">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" value={resource.first_name} onChange={this.handleChange.bind(this, 'first_name')} />
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" value={resource.last_name} onChange={this.handleChange.bind(this, 'last_name')} />
                    </div>
                    <div className="ui buttons">
                      <Link to="/resources" className="ui button">Cancel</Link>
                      <div className="or"></div>
                      <button className="ui positive button" onClick={this.handleSave}>Save</button>
                  </div>


                </div>
            </div>
        );
    }

}

export default graphql(
    MutationCreateResource,
    {
        props: (props) => ({
            createResource: (resource) => {
                return props.mutate({
                    update: (proxy, { data: { createResource } }) => {
                        // Update QueryAllResources
                        const query = QueryAllResources;
                        const data = proxy.readQuery({ query });

                        data.listResources.items = [...data.listResources.items.filter(e => e.id !== createResource.id), createResource];

                        proxy.writeQuery({ query, data });

                        // Create cache entry for QueryGetResource
                        const query2 = QueryGetResource;
                        const variables = { id: createResource.id };
                        const data2 = { getResource: { ...createResource } };

                        proxy.writeQuery({ query: query2, variables, data: data2 });
                    },
                    variables: resource,
                    optimisticResponse: () => ({
                        createResource: {
                            ...resource, id: uuid(), __typename: 'Resource'
                        }
                    }),
                })
            }
        })
    }
)(NewResource);
