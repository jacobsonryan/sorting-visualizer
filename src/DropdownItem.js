import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownItem(props) {
    return <Dropdown.Item  onClick={() => props.onClick(props.color)}>{props.label}<div className="color" style={{width: '15px', height: '15px', backgroundColor: props.color}}></div></Dropdown.Item>
}

