"use client";

import { Card } from 'primereact/card';
import Tree from 'react-animated-tree';
import "./style.css";

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
  const text = (text: string) => <a href="">{text}</a>
  return (
    <Card >
      <Tree content={text("Main")} open style={treeStyles}>
        <Tree content="Subtree With Children" >
          <Tree content="hello" />
          <Tree content="sub-subtree with children">
            <Tree content="child 1" style={{ color: '#63b1de' }} />
            <Tree content="child 2" style={{ color: '#63b1de' }} />
            <Tree content="child 3" style={{ color: '#63b1de' }} />
          </Tree>
          <Tree content="hello" />
        </Tree>
        <Tree content="hello"  />
        <Tree content="hello"  />
      </Tree>
    </Card>
  )
}

export default PFD;