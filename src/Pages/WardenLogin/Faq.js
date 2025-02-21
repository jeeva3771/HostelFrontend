import Header from "../Partials/Header"
import Sidebar from "../Partials/Aside"
import Breadcrumbs from "../Partials/BreadCrumb"
import Footer from "../Partials/Footer"
import { useEffect } from "react"

function Faq() {
     const breadcrumbData = [
        { name: 'Home', link: '/home/' },
        { name: 'Frequently Asked Questions', link: '' },
    ]
    
    useEffect(() => {
        document.title = "F.A.Q"
    }, [])
    return (
        <>
        <Header />
        <Sidebar />
        <main 
            className="main" 
            id="main"
        >
        <div className="pagetitle">
            <h1>Frequently Asked Questions</h1>
            <Breadcrumbs breadcrumb={breadcrumbData}/>
        </div>
            <section className="section faq">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card basic">
                            <div className="card-body">
                                <h5 className="card-title">Basic Questions</h5>
                                <div>
                                    <h6>1. What is the Hostel Attendance Management System?</h6>
                                    <p>It is a system that helps manage student attendance in hostels by tracking attendance,
                                        room assignments, and block and block floor details.</p>
                                </div>

                                <div className="pt-2">
                                    <h6>2. How can I access the system?</h6>
                                    <p>You can log in with your admin, warden, or student credentials, depending on your role.</p>
                                </div>

                                <div className="pt-2">
                                    <h6>3. How do I mark attendance for students?</h6>
                                    <p>Both the admin and the warden can mark attendance by selecting the block, floor, room, 
                                        and students from the interface. They can then update the attendance status of each
                                        student as "Present" or "Absent.</p>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Forgot Your Login Credentials?</h5>
                                <div 
                                    className="accordion accordion-flush" 
                                    id="faq-group-1"
                                >
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button 
                                                className="accordion-button collapsed" 
                                                data-bs-target="#faqsOne-1" 
                                                type="button" 
                                                data-bs-toggle="collapse"
                                            >
                                                What should I do if I forget my login credentials?
                                            </button>
                                         </h2>
                                        <div 
                                            id="faqsOne-1" 
                                            className="accordion-collapse collapse" 
                                            data-bs-parent="#faq-group-1"
                                        >
                                            <div className="accordion-body">
                                                If you forget your login credentials, use the "Forgot Password" 
                                                option available on the login page. You will receive an OTP to reset your password.<br />
                                                <b>Note:</b> After multiple failed attempts to log in, your account will be temporarily locked 
                                                for 3 hours after you can try again.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Understanding the Challenges of Attendance Management</h5>
                                    <div 
                                        className="accordion accordion-flush" 
                                        id="faq-group-2"
                                    >
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed" 
                                                    data-bs-target="#faqsTwo-1" 
                                                    type="button" 
                                                    data-bs-toggle="collapse"
                                                >
                                                    Who can access the attendance data?
                                                </button>
                                            </h2>
                                            <div 
                                                id="faqsTwo-1" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-2"
                                            >
                                                <div className="accordion-body">
                                                    Both the admin and the warden have the same access to attendance data. There is no difference in their 
                                                    ability to manage attendance.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <div 
                                                id="faqsTwo-2" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-2"
                                            >
                                                <div className="accordion-body">
                                                    In minus quia impedit est quas deserunt deserunt et. Nulla non quo dolores minima fugiat aut saepe aut inventore. Qui nesciunt odio officia beatae iusto sed voluptatem possimus quas. Officia vitae sit voluptatem nostrum a.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed" 
                                                    data-bs-target="#faqsTwo-3" 
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                >
                                                    How can I update the attendance data if I made a mistake? 
                                                </button>
                                            </h2>
                                            <div 
                                                id="faqsTwo-3" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-2"
                                            >
                                                <div className="accordion-body">
                                                    If a mistake is made while marking attendance, both the admin and the 
                                                    warden can edit or update the attendance records directly through the system.
                                                    To update the attendance, go to the attendance list. You will find an edit icon next to each 
                                                    attendance record. Click on the icon to make changes, and then save the updated information.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed" 
                                                    data-bs-target="#faqsTwo-4" 
                                                    type="button" 
                                                    data-bs-toggle="collapse"
                                                >
                                                    What happens if there is no attendance data for a selected student, month, or year?
                                                </button>
                                            </h2>
                                            <div 
                                                id="faqsTwo-4" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-2"
                                            >
                                                <div className="accordion-body">
                                                    If no matching attendance data exists, the default calendar view will be displayed.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed" 
                                                    data-bs-target="#faqsTwo-5" 
                                                    type="button" 
                                                    data-bs-toggle="collapse"
                                                >
                                                    Can I access the system from mobile devices?
                                                </button>
                                            </h2>
                                            <div 
                                                id="faqsTwo-5" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-2"
                                            >
                                                <div className="accordion-body">
                                                    Yes, the system is mobile-friendly and can be accessed using smartphones, tablets, 
                                                    or desktops.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed" 
                                                    data-bs-target="#faqsTwo-6" 
                                                    type="button" 
                                                    data-bs-toggle="collapse"
                                                >
                                                    How do I contact support if I face technical issues?
                                                </button>
                                            </h2>
                                            <div 
                                                id="faqsTwo-6" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-2"
                                            >
                                                <div className="accordion-body">
                                                    If you encounter technical issues, please contact support by 
                                                    emailing support@example.com or calling +1-800-123-4567.                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Access Restricted</h5>

                                    <div 
                                        className="accordion accordion-flush" 
                                        id="faq-group-3"
                                    >
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed" 
                                                    data-bs-target="#faqsThree-1" 
                                                    type="button" 
                                                    data-bs-toggle="collapse"
                                                >
                                                    Who can edit, delete, or add warden information?
                                                </button>
                                            </h2>
                                            <div 
                                                id="faqsThree-1" 
                                                className="accordion-collapse collapse" 
                                                data-bs-parent="#faq-group-3"
                                            >
                                                <div className="accordion-body">
                                                    Only admins have the authority to edit, delete, or add warden information. 
                                                    If you need access, please contact the system administrator.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        <Footer />
    </>
    )
}

export default Faq