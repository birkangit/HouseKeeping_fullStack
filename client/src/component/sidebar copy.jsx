import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import "react-pro-sidebar/dist/scss/styles.scss";
import { BsFillGrid3X3GapFill, BsFillBookmarkFill } from "react-icons/bs";

class Sidebar extends React.Component {
  render() {
    return (
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<BsFillGrid3X3GapFill />}>Dashboard</MenuItem>
          <SubMenu title="Log" icon={<BsFillBookmarkFill />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    );
  }
}

export default Sidebar;
