import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getTeam(id: $id) {
    id
    prjtem_id
    name
    prj_id
    res_id
    role_type
  }
}`);
