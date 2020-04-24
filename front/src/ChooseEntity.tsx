import React from 'react'


type ChooseEntityProps = { 
  entityName: string,
  remainingRounds: number,
  onClickGo: () => void,
  onClickPass: () => void
}

function ChooseEntity({ entityName, remainingRounds, onClickGo, onClickPass }: ChooseEntityProps): JSX.Element {
  return (
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
  )
}

export default ChooseEntity
