import gql from "graphql-tag";

export default gql(`
mutation($id: ID!) {
  deleteTeam(id: $id) {
    prjtem_id
    name
    prj_id
    res_id
    role_type
  }
}`);
