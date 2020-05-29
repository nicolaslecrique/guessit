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
    alignSelf: 'center',
    maxWidth: "450px",
    '&:hover': {
      borderWidth: 0
    }
  },
  fieldInput: {
    height: '36px',
    borderRadius: stdCornerRadius,
    paddingRight: stdCornerRadius,
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
  isDemoMode: boolean
}

export function TypingBar({typedMessage, onChangeTypedMessage, onSendMessage, isDemoMode}: TypingBarProps): JSX.Element {

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
      disabled={isDemoMode}
    variant="outlined"
    autoFocus={!isDemoMode}
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
          disabled={isDemoMode}
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
