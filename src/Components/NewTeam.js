import React, { Component } from "react";
import { Link } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { graphql } from "react-apollo";
import QueryAllTeams from "../GraphQL/QueryAllTeams";
import QueryGetTeam from "../GraphQL/QueryGetTeam";
import MutationCreateTeam from "../GraphQL/MutationCreateTeam";

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { nearest15min } from "../Utils";
import DateTimePickerCustomInput from "./DateTimePickerCustomInput";
import AudioRecorder from 'react-audio-recorder';

class NewTeam extends Component {

    static defaultProps = {
        createTeam: () => null,
    }

    state = {
        team: {
            name: '',
            res_id: '',
            role_type: '',
            prjtem_id: '',
            prj_id: '',
            }
    };

    handleChange(field, { target: { value } }) {
        const { team } = this.state;

        team[field] = value;

        this.setState({ team });

    }

    handleDateChange(field, value) {
        this.handleChange(field, { target: { value: value.format() } });
    }

    handleSave = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const { createTeam, history } = this.props;
        const { team } = this.state;

        await createTeam({ ...team });

        history.push('/teams');
    }



    render() {
        const { team } = this.state;

        return (

            <div className="ui container raised very padded segment">
                <h1 className="ui header">Create a BCJ Team</h1>
                <div className="ui form">
                    <div className="field  eight wide">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={team.name} onChange={this.handleChange.bind(this, 'name')} />
                    </div>

                      <div className="field eight wide">
                          <label htmlFor="res_id">Res ID</label>
                          <input type="text" id="res_id" value={team.res_id} onChange={this.handleChange.bind(this, 'res_id')} />
                      </div>

                      <div className="field eight wide">
                          <label htmlFor="prjtem_id">prjtem_id</label>
                          <input type="text" id="prjtem_id" value={team.prjtem_id} onChange={this.handleChange.bind(this, 'prjtem_id')} />
                      </div>

                      <div className="field eight wide">
                          <label htmlFor="prj_id  ">prj_id</label>
                          <input type="text" id="prj_id" value={team.prj_id} onChange={this.handleChange.bind(this, 'prj_id')} />
                      </div>

                      <div className="ui buttons">
                        <Link to="/teams" className="ui button">Cancel</Link>
                        <div className="or"></div>
                        <button className="ui positive button" onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default graphql(
    MutationCreateTeam,
    {
        props: (props) => ({
            createTeam: (team) => {
                return props.mutate({
                    update: (proxy, { data: { createTeam } }) => {
                        // Update QueryAllTeams
                        const query = QueryAllTeams;
                        const data = proxy.readQuery({ query });

                        data.listTeams.items = [...data.listTeams.items.filter(e => e.id !== createTeam.id), createTeam];

                        proxy.writeQuery({ query, data });

                        // Create cache entry for QueryGetTeam
                        const query2 = QueryGetTeam;
                        const variables = { id: createTeam.id };
                        const data2 = { getTeam: { ...createTeam } };

                        proxy.writeQuery({ query: query2, variables, data: data2 });
                    },
                    variables: team,
                    optimisticResponse: () => ({
                        createTeam: {
                            ...team, id: uuid(), __typename: 'Team'

                        }
                    }),
                })
            }
        })
    }
)(NewTeam);
