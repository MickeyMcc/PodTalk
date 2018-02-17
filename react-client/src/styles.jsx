import Column from "antd/lib/table/Column";

module.exports.MainStyle = {
  display: 'flex',
  flexDirection: 'row',
}


module.exports.PaneStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(235, 235, 235)',
  border: '3px solid white',
  marginTop: '10px',
  marginLeft: '15px',
  width: '40%',
  padding: '10px',
  textAlign: 'center'
};

module.exports.ButtonStyle = {
  backgroundColor: 'rgb(79, 33, 122)', /* Green */
  border: 'none',
  color: 'white',
  padding: '12px 26px',
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: '14px',
  display: 'inline-block',
  marginTop: '20px',
  marginBottom: '15px',
};

module.exports.EntryStyle = {
    display: 'flex',
    flexDirection: 'row',
    border: '2px solid grey',
    padding: '8px',
    marginTop: '5px',
    backgroundColor: 'rgb(235, 235, 235)'
};

module.exports.ShowInfoStyle = {
  flexDirection: 'column',
  width: '40%',
  marginTop: '20px'
}

module.exports.CommentsStyle = {
  flexDirection: 'column',
  width: '50%',  
};

module.exports.CommentStyle = {
  textAlign: 'left',
  marginTop: '5px',
};

module.exports.InputStyle = {
  width: '70%',
  padding: '12px 20px',
  margin: '8px 0',
  boxSizing: 'border-box',
  border: '2px solid rgb(79, 33, 122)',
  borderRadius: '4px',
};

module.exports.NavBarStyle = {
  margin: '0px',
  padding: '0px',
  width: '100%',
  height: '35px',
  backgroundColor: 'rgb(79, 33, 122)'
};

module.exports.NavEntryStyle = {
  color: 'white',
  marginTop: '8px',
  marginRight: '25px' 
}
