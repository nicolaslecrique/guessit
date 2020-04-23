import React from 'react'
import Base from './Base'

type ChooseEntityProps = { 
  entityName: string,
  remainingRounds: number,
  onClickGo: () => void,
  onClickPass: () => void
}

function ChooseEntity({ entityName, remainingRounds, onClickGo, onClickPass }: ChooseEntityProps): JSX.Element {
  return (
    <Base>
      <div>
        <div>{remainingRounds} rounds remaining</div>
        <br/>
        <div>Describe <b>{entityName}</b> in 30 seconds</div>
        <br/>
        <div>
          <button onClick={() => onClickGo()}>Let's GO !</button>
          <button onClick={() => onClickPass()}>Pass</button>
        </div>
      </div>
    </Base>
  )
}

export default ChooseEntity
