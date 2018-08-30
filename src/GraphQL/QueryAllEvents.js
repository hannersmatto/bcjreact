import gql from "graphql-tag";

export default gql(`
query {
  listEvents(limit: 1000) {
    items {
      id
      name
      where
      when
      description
      prj_id
      res_id_owner
      prj_status
      date_created
      date_modified
      date_required_by
      comments {
        items {
          commentId
        }
      }
    }
  }
}`);
