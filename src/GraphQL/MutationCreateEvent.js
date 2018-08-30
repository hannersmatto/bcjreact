import gql from "graphql-tag";

export default gql(`
mutation($name: String!
  $when: String!
  $where: String!
  $description: String!
  $prj_id :String
  $res_id_owner: String
  $prj_status: String
  $date_created: String
  $date_modified: String
  $date_required_by: String
  $prj_type: String
  $date_required_orig: String
  $cal_id: String
  $budgeted_work: String
  $budgeted_cost: String
  $date_plan_start: String
  $date_plan_finish: String )
  {
  createEvent(
    name: $name
    when: $when
    where: $where
    description: $description
    prj_id: $prj_id
    res_id_owner: $res_id_owner
    prj_status: $prj_status
    date_created: $date_created
    date_modified: $date_modified
    date_required_by: $date_required_by
    prj_type: $prj_type
    date_required_orig: $date_required_orig
    cal_id: $cal_id
    budgeted_work: $budgeted_work
    budgeted_cost: $budgeted_cost
    date_plan_start: $date_plan_start
    date_plan_finish: $date_plan_finish
  ) {
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
    prj_type
    date_required_orig
    cal_id
    budgeted_work
    budgeted_cost
    date_plan_start
    date_plan_finish
    comments {
      items {
        commentId
      }
    }
  }
}`);
