

const BooksPage = () => {

    const LoginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
  return (
    <div>
      {LoginInfo.username}
    </div>
  )
}

export default BooksPage
