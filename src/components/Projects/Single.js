import React, { useRef, useEffect, useState } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

import { Keyframes, animated } from 'react-spring/renderprops';
import delay from 'delay';
import { Project } from './ProjectsCSS';

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  // peek: [{ x: 0, from: { x: -100 }, delay: 500 }, { x: -100, delay: 800 }],
  // single items,
  open: { delay: 0, x: 0 },
  // or async functions with side-effects
  close: async call => {
    await delay(400)
    await call({ delay: 0, x: 100 })
  },
})

const Waves = Keyframes.Spring({
  open: { delay: 0, x: isMobile ? -20 : 30 },
  // or async functions with side-effects
  close: async call => {
    await delay(400)
    await call({ delay: 0, x: isMobile ? 80 : 100 })
  },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  // peek: [
  //   { x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600 },
  //   { x: -100, opacity: 0, delay: 0 },
  // ],
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: 100, opacity: 0, delay: 0 },
})





const Single = ({project}) => {


  // ITEMS for content
  const items = [
    <div className="technologies">
      <img src="https://www.smallbizgenius.net/wp-content/uploads/2019/06/smallbizgenius_favicon.png" alt="" />
      <div>
        <h2>Technologies</h2>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>,
    <div className="features">
      <img src="https://www.smallbizgenius.net/wp-content/uploads/2019/06/smallbizgenius_favicon.png" alt="" />
      <div>
        <h2>Features</h2>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>,
    <div className="presentation">
      <img src="https://www.smallbizgenius.net/wp-content/uploads/2019/06/smallbizgenius_favicon.png" alt="" />
      <div>
        <h2>Presentation</h2>
        <a href="https://www.google.com" target="_blank"><button>Youtube</button></a>
      </div>
    </div>,
    <a href="https://www.google.com" target="_blank"><button>Github</button></a>
   
  ]

  const [open, setOpen] = useState(false);





  const toggle = () => setOpen(!open);

  // React.useEffect(()=>{


  //   setOpen(open === undefined 
  //     ? 'peek'
  //     : this.state.open
  //     ? 'open'
  //     : 'close'
  //     );

  // }, [])

  const state = open === false
  ? 'close'
  : open
  ? 'open'
  : 'close';
  
  // const icon = open ? 'fold' : 'unfold';

  return (
    <Project fontPrimaryColor={project.font_primary_color} primaryColor={project.primary_color} svgColors={[project.wave_color_1, project.wave_color_2, project.wave_color_3]} >

      <div className="project-main-content">
        <div className="main-content-positioning">
          <h1>{project.name}</h1>
          <h4>{project.desc_short}</h4>
          <p>{project.desc_long}</p>
          <button><a href={project.link}>LIVE PAGE</a></button>
        </div>
      </div>

      <div className="project-justify">

        {/* waves */}
        
        <Waves native state={state}>
          {({ x }) => (

            <animated.div
            onClick={toggle}
            className="svg-waves-container"
            style={{
              transform: x.interpolate(x => `translate3d(${x+30}%,0,0)`)
            }}>
              <div className="show-more-less">{open === false ? "more" : "less"}</div>
              {project.background}

          </animated.div>
          )}
        </Waves>
   
            {/* hidden content */}
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div
              onClick={toggle}
              className="sidebar"
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              }}>

              <div className="sidebar-content">
                <Content
                  native
                  items={items}
                  keys={items.map((_, i) => i)}
                  reverse={!open}
                  state={state}>
                  {(item, i) => ({ x, ...props }) => (
                    <animated.div
                      style={{
                        transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                        ...props,
                      }}>
                    
                        {item}
                    
                    </animated.div>
                  )}
                </Content>
              </div>

            </animated.div>
          )}
        </Sidebar>

       

      </div>

    </Project>
  )
}

export default Single
