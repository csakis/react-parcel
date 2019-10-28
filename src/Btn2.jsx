import React from 'react';
import Button from '@material-ui/core/Button';


const handleClick = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, "ip");
  });

 
};
const Btn2 = () => (
  <Button
    color="primary"
    variant="contained"
    onClick={handleClick}
  >
    change IP!
  </Button>
);

export default Btn2;
