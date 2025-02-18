import { useEffect } from "react"
import { Link } from "react-router-dom"

function ErrorPage() {
    useEffect(() => {
            document.title = "Error"
    }, [])
    return (
    <main>
        <div className="container">
            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <h1>404</h1>
                <h2>The page you are looking for doesn't exist.</h2>
                <Link
                    className="btn" 
                to="/home/"
                >Back to home
                </Link>
                <img 
                    src="/assets/img/not-found.svg" 
                    className="img-fluid py-5" 
                    alt="Page Not Found" 
                />
                <div className="credits">
                    Designed by <a href="https://www.linkedin.com/in/jeeva377">Jeeva|Linkedin</a>
                </div>
            </section>
        </div>
    </main>
    )
}

export default ErrorPage