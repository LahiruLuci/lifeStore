// "use client"

// export default function Footer() {
//     return (
//         <footer id="footer" className="footerBorder" style={{marginBottom: '0px'}}>
//             <div className="col-12 w-100 py-3 footer-background">
//                 <div className="row">
//                     <div className="offset-6 col-6 footer-text"></div><br /><br /><br /><br /><br /><br />
//                     <div className="row text-light ">
//                         <div className="me-auto">
//                             <ul className="list-inline text-end footer-icons">
//                                 <li className="list-inline-item text-center">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://web.facebook.com/SLTMobitel?_rdc=1&_rdr"><div className="smicon1"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://x.com/slt_mobitel"><div className="smicon2"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://www.linkedin.com/company/srilankatelecom/posts/?feedView=all"><div className="smicon3"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://www.instagram.com/sltmobitel_official/?hl=en"><div className="smicon4"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://www.youtube.com/@SLTMobitel"><div className="smicon5"></div></a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }

"use client";

export default function Footer() {
    return (
        <footer id="footer" className="footerBorder" style={{ marginBottom: '0px' }}>
            <div className="col-12 w-100 py-3 footer-background">
                <div className="row">
                    <div className="offset-6 col-6 footer-text"></div>
                    <br /><br /><br /><br /><br /><br />

                    {/* Social Icons + Hotline aligned to the right */}
                    <div className="row text-light">
                        <div className="ms-auto text-end pe-5">
                            <ul className="list-inline footer-icons mb-2">
                                <li className="list-inline-item text-center mx-1">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://web.facebook.com/SLTMobitel?_rdc=1&_rdr"><div className="smicon1"></div></a>
                                </li>
                                <li className="list-inline-item text-center mx-1">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://x.com/slt_mobitel"><div className="smicon2"></div></a>
                                </li>
                                <li className="list-inline-item text-center mx-1">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://www.linkedin.com/company/srilankatelecom/posts/?feedView=all"><div className="smicon3"></div></a>
                                </li>
                                <li className="list-inline-item text-center mx-1">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://www.instagram.com/sltmobitel_official/?hl=en"><div className="smicon4"></div></a>
                                </li>
                                <li className="list-inline-item text-center mx-1">
                                    <a className="text-light text-decoration-none" target="_blank"
                                        href="https://www.youtube.com/@SLTMobitel"><div className="smicon5"></div></a>
                                </li>
                            </ul>

                            {/* ✅ Hotline below icons, right aligned, black text */}
                            <p className="mt-1 mb-0 fw-semibold" style={{ color: '#000', fontSize: '14px' }}>
                                Hotline – <a href="tel:0704765550" className="text-decoration-none" style={{ color: '#000' }}>070 476 5550</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
