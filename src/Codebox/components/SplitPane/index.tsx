import { Allotment } from 'allotment'
import React, { useRef } from 'react'

import 'allotment/dist/style.css'

interface ISplitPane {
  children?: React.ReactNode[]
}

export const SplitPane: React.FC<ISplitPane> = (props) => {
  const ref = useRef<any>(null)
  const defaultSizes = [40, 100, 100]

  return (
    <Allotment ref={ref} defaultSizes={defaultSizes} vertical={false}>
      <Allotment.Pane snap minSize={200} preferredSize={230}>
        {props.children?.[0]}
      </Allotment.Pane>
      <Allotment.Pane snap minSize={100}>
        {props.children?.[1]}
      </Allotment.Pane>

      {props.children?.[2] ? (
        <Allotment.Pane snap minSize={0}>
          {props.children?.[2]}
        </Allotment.Pane>
      ) : null}
    </Allotment>
  )
}
