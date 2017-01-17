/**
 * Created by timur on 1/16/17.
 */

const notify = (message) => {
  if (!('Notification' in window)) {
    // This browser does not support desktop notification
    alert(message)
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    const notification = new Notification(message)
    return notification
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        const notification = new Notification(message)
        return notification
      }
    })
  }
}

export default notify
