import gql from "graphql-tag";

export default gql(`
query {
  listTeams(limit: 1000) {
    items {
      id
      prjtem_id
      name
      prj_id
      res_id
      role_type
    }
  }
}`);
