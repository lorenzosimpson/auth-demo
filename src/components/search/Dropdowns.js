import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdowns = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { title, icon, dropdownItems } = props;

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className='mr-2'>
      <DropdownToggle>
        {icon} {title}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{title}</DropdownItem>
        {dropdownItems.map(item => (
            <>
            {item.divider ? (
                <DropdownItem divider />
            ): (
                <DropdownItem onClick={() => item.callback()}>{item.name}</DropdownItem>
            )
            }
            </>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Dropdowns;