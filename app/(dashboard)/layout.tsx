const Layout = ({children} : {children : React.ReactNode}) => {
console.log('hit')
    return(
        <main>
            main page
          {children}
        </main>
    )

}
export default Layout;