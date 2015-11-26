// Returns a formatted date str 'WeekDay, MonthDay of Month'
export default function format (str) {
  const date = new Date(str)
  const days = [ 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  return `${days[date.getDay()]}, ${date.getUTCDate()}th of ${months[date.getMonth()]} ${date.getFullYear()}`
}
