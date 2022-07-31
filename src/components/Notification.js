const Notification = ({ message }) => {
    const trampilla = {
      marginTop: '1%'
    }
    if (message === null) {
      return (
        
      <div style={trampilla} >
          .
      </div>)
    }
  
    return (
      <div className="inicio">
        {message}
      </div>
    )
  }
  export default Notification;