import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getEvent(id: $id) {
    id
    name
    where
    when
    description
    prj_id
    prj_id
    res_id_owner
    prj_status
    date_created
    date_modified
    date_required_by
    prj_type
    date_required_orig
    cal_id
    budgeted_work
    budgeted_cost
    date_plan_start
    date_plan_finish
    comments {
      __typename
      items {
        commentId
        content
        createdAt
      }
    }
  }
}`);
