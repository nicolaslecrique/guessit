import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import TextField from '@material-ui/core/TextField'
import {stdCornerRadius} from '../style/common_style'


const useStyles = makeStyles({
  input: {
    borderRadius: stdCornerRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#fff",
    width: "100%",
    '&:hover': {
      borderWidth: 0
    }
  },
  fieldInput: {
    height: '36px',
    borderRadius: stdCornerRadius,
    paddingRight :stdCornerRadius,
  },
  notchedOutline: {
    borderWidth: '0px',
    borderColor: 'white !important'
  },
})

export type TypingBarProps = {
  typedMessage: string,
  onChangeTypedMessage: (message: string) => void,
  onSendMessage: () => void

}

export const InputBar = ({typedMessage, onChangeTypedMessage, onSendMessage}: TypingBarProps): JSX.Element => {

  const classes = useStyles()

  // necessary to prevent to loose focus when user click send button on mobile
  const handleMouseDownSend = (event: any) => {
    event.preventDefault();
  };

  const sendMessage = (event: any) => {
    onSendMessage()
    event.preventDefault();
  };

  return (
    <TextField
    variant="outlined"
    autoFocus={true}
    autoComplete="off"
    className={classes.input}
    id="outlined-basic"
    placeholder="Type your sentence"
    value={typedMessage}
    onChange={(event: any) => onChangeTypedMessage(event.target.value)}
    onKeyPress={(event: any) => {
      if (event.key === 'Enter') {
        sendMessage(event)
      }
    }}
    InputLabelProps={{
      shrink: true
    }}
    InputProps={{
      classes: {
        notchedOutline: classes.notchedOutline,
      },
      className: classes.fieldInput,
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="Enter"
          onClick={sendMessage}
          onMouseDown={handleMouseDownSend}
        >
          <SendIcon />
        </IconButton>
      </InputAdornment>,
    }}
  >
  </TextField>
  )

}
