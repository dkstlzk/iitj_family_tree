import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import '../assets/Style/home.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Profile from './Profile';

const TwoDTree = ({ data }) => {
  const [roll, setroll] = useState()
  const [showModal, setShowModal] = useState(false);
  const value = 0.5;

  if (!data) return <div className='loading_conatiner'><CircularProgressbar className='loading' value={value} maxValue={1} text={`${value * 100}%`} /></div>

  const new_data = []
  const all_parent = {
    name: 'All',
    children: []
  }
  data.forEach(item => {
    all_parent.children.push(item);
  });
  new_data.push(all_parent)

  const renderCustom = ({ nodeDatum, toggleNode, links }) => {
    const str = nodeDatum.name
    const name = str.slice(0, 19) + ''
    return (
      <g
        onMouseOut={() => handleNodeMouseOut(nodeDatum)}
        onMouseOver={() => handleNodeMouseOver(nodeDatum)}
      >

        <circle r={7} className='circlecolor' />
        <text
          textAnchor="middle"
          dy="24"
          dx='0'
          className='text_'
        >{name} </text>
      </g>

    )
  }
  const getLinkColor = (link) => {
    if (link.source.name.includes('root')) {
      return 'white';
    }
    return 'white';
  };

  const getLinkProps = (link) => ({
    stroke: getLinkColor(link),
    strokeWidth: 10,
  });

  const handleNodeMouseOver = (nodeDatum, event) => {
    if (nodeDatum.name !== 'All') {
      setroll(nodeDatum)
      setShowModal(true)

    }
  };
  const handleNodeMouseOut = (nodeData, event) => {
    if (nodeData.name !== 'All') {
      setShowModal(false)
    }
  };
  // const dimensions = {
  //   width: 800,
  //   height: 600
  // };
  
  const dimensions = {
    width: window.innerWidth,  // Full screen width
    height: window.innerHeight // Full screen height
  };
  
  <Tree 
    data={new_data}
    translate={{ x: dimensions.width / 2, y: dimensions.height / 2 }} // Center both horizontally & vertically
    dimensions={dimensions}
  />
  

  return (
    <>
      {showModal && (
        <Profile rollNo={roll.rollNo} />
      )}
      <Tree data={new_data}
        scaleExtent={{
          min: 0.25,
          max: 2
        }}
        zoom={1.5}
        zoomable={true}
        linkClassName={"custom-link"}
        depthFactor={300}
        linkProps={getLinkProps}
        // initialDepth={2}
        // pathFunc="straight"
        nodeSize={{ x: 100, y: 20 }}
        // translate={{ x: 200, y: 530 }}
        // draggable={false}
        dimensions={dimensions}
        // orientation={"vertical"}
        // pathClassFunc={() => 'custom-link'}
        renderCustomNodeElement={renderCustom}
        transitionDuration={500}
        shouldCollapseNeighborNodes={true}
        separation={{ siblings: 2, nonSiblings: 2 }}
      // renderCustomLinkElement={renderCustomLink}

      />
    </>
  )
}

export default TwoDTree
