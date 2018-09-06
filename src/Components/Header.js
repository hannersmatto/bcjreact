import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Menu, Segment,Sticky } from 'semantic-ui-react'

import { Greetings } from 'aws-amplify-react';

import { Dropdown } from 'semantic-ui-react'


class Header extends Component {

    render() {

        return (

            <Sticky>

              <Menu>
              <Menu.Item as={Link} to='/'>
              <h1 className="ui header left"><i className="icon pied piper alternate massive"/></h1>
              </Menu.Item>
              <Menu.Item as={Link} to='/'>
              Projects
              </Menu.Item>
              <Menu.Item as={Link} to='/'>
              My Actions
              </Menu.Item>
              <Menu.Item as={Link} to='/Teams'>
              Teams
              </Menu.Item>
              <Menu.Item as={Link} to='/Resources'>
              Resources
              </Menu.Item>

              <Menu.Menu>
           <Menu.Item>
             <Input icon='search' placeholder='Search...' />
           </Menu.Item>
         </Menu.Menu>

              <Menu.Item >

              <Dropdown
                  button
                  className='icon'
                  floating
                  labeled
                  icon='world'
                  search
                  text='Language'
                />
                </Menu.Item>
                <Menu.Item >

</Menu.Item>
              </Menu>

              </Sticky>
            )
            }
          }


export default Header
