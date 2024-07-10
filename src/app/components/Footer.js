"use client"

export default function Footer() {
    return (
        <footer id="footer" className="footerBorder">
            <div className="col-12 w-100 py-3 footer-background">
                <div className="row">
                    <div className="offset-6 col-6 footer-text"></div><br /><br /><br /><br /><br /><br />
                    <div className="row text-light ">
                        <div className="me-auto">
                            <ul className="list-inline text-end footer-icons">
                                <li className="list-inline-item text-center">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="http://facebook.com/"><div className="smicon1"></div></a>
                                </li>
                                <li className="list-inline-item text-center">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://twitter.com/"><div className="smicon2"></div></a>
                                </li>
                                <li className="list-inline-item text-center">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://www.linkedin.com/"><div className="smicon3"></div></a>
                                </li>
                                <li className="list-inline-item text-center">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://www.instagram.com/"><div className="smicon4"></div></a>
                                </li>
                                <li className="list-inline-item text-center">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://www.youtube.com/"><div className="smicon5"></div></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}