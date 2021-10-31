import { Grid } from "gridjs";
import { Query, Subscribe } from './bus';
import { queryUsers, subUsers } from './gqlStr'

let users = []

const grid = new Grid({
  search: true,
  sort: true,
  columns: ["Name", "Email", "Phone Number"],
  data: () => Query(queryUsers).then(x => (users = x.data.users)),
  className: {
    td: 'dataCell',
    th: 'headerCell'
  }
});

grid.render(document.getElementById("grid"));

Subscribe(subUsers, res => {
  if (!Array.isArray(res.data.users)) return;

  users = [...users.filter(x => !res.data.users.some(y => x.id == y.id)), ...res.data.users]
    .sort((a, b) => a.id - b.id)
  grid.updateConfig({ data: users }).forceRender()
})