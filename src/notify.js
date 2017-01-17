/**
 * Created by timur on 1/16/17.
 */

const notify = message => {

  if (!('Notification' in window)) {
    return alert(message)
  }

  switch (Notification.permission) {
    case 'granted':
      return new Notification(message)

    case 'denied':
      return Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          return new Notification(message)
        }
      })

    default:
      return alert(message)
  }
}

export default notify
