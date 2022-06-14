import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";
import ErrorBoundary from './ErrorBoundary';

// get this data from Context
// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();

    //   filteredUsers: DUMMY_USERS,
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  // calling life cycle methods

  //   // lets say we want to fetch Users for first time
  componentDidMount() {
    // Send HTTP request ...
    //   this.setState({filteredUsers: DUMMY_USERS});
    this.setState({ filteredUsers: this.context.users });
  }

  // NOTE: componentDidUpdate will get executed infinitely ( Infinite Loop ) on each render or re render
  // So need to check previous state which received as arguments to componentDidUpdate method with current state
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        // filteredUsers: DUMMY_USERS.filter((user) =>
        //   user.name.includes(this.state.searchTerm)
        // ),

        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
