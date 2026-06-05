function Spinner({ small = false }) {
  return <span className={small ? 'spinner spinner-small' : 'spinner'} aria-hidden="true"></span>
}

export default Spinner
