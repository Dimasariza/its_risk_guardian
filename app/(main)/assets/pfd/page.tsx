"use client";

import { Card } from 'primereact/card';
import Tree from 'react-animated-tree';
import "./style.css";
import React, { ReactPropTypes } from 'react';
import { TreeProps } from 'react-animated-tree';
import Link from 'next/link';

interface TreePropsMenu {
  content: any
}


const treeStyles = {
  // position: 'absolute',
  // top: 40,
  // left: 40,
  // color: 'white',
  fill: 'rgba(255,255,255, 0.5)',
  width: '100%',
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle',
}

const PFD = () => {
  const text = (text: string) => <Link href={{pathname: "/assets/pfd", query: {name: text}}} >{text}</Link>
  const TreeMenu: any = (props: TreeProps) => <Tree {...props}></Tree>

  return (
    <Card >
      <TreeMenu content={text("Main")} open style={treeStyles}>
        <TreeMenu content="Subtree With Children" >
          <TreeMenu content="Child 1"></TreeMenu>
          <TreeMenu content="sub-subtree with children">
            <TreeMenu content={text("child 1")} style={{ color: '#63b1de' }} />
            <TreeMenu content="child 2" style={{ color: '#63b1de' }} />
            <TreeMenu content="child 3" style={{ color: '#63b1de' }} />
          </TreeMenu>
          <TreeMenu content="hello" />
        </TreeMenu>
        <TreeMenu content="hello"  />
        <TreeMenu content="hello"  />
      </TreeMenu>
    </Card>
  )
}

export default PFD;