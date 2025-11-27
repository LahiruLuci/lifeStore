// // "use client"

// // export default function Footer() {
// //     return (
// //         <footer id="footer" className="footerBorder" style={{marginBottom: '0px'}}>
// //             <div className="col-12 w-100 py-3 footer-background">
// //                 <div className="row">
// //                     <div className="offset-6 col-6 footer-text"></div><br /><br /><br /><br /><br /><br />
// //                     <div className="row text-light ">
// //                         <div className="me-auto">
// //                             <ul className="list-inline text-end footer-icons">
// //                                 <li className="list-inline-item text-center">
// //                                     <a className="text-light text-decoration-none" target="_blank"
// //                                         href="https://web.facebook.com/SLTMobitel?_rdc=1&_rdr"><div className="smicon1"></div></a>
// //                                 </li>
// //                                 <li className="list-inline-item text-center">
// //                                     <a className="text-light text-decoration-none" target="_blank"
// //                                         href="https://x.com/slt_mobitel"><div className="smicon2"></div></a>
// //                                 </li>
// //                                 <li className="list-inline-item text-center">
// //                                     <a className="text-light text-decoration-none" target="_blank"
// //                                         href="https://www.linkedin.com/company/srilankatelecom/posts/?feedView=all"><div className="smicon3"></div></a>
// //                                 </li>
// //                                 <li className="list-inline-item text-center">
// //                                     <a className="text-light text-decoration-none" target="_blank"
// //                                         href="https://www.instagram.com/sltmobitel_official/?hl=en"><div className="smicon4"></div></a>
// //                                 </li>
// //                                 <li className="list-inline-item text-center">
// //                                     <a className="text-light text-decoration-none" target="_blank"
// //                                         href="https://www.youtube.com/@SLTMobitel"><div className="smicon5"></div></a>
// //                                 </li>
// //                             </ul>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </footer>
// //     );
// // }

// "use client";

// export default function Footer() {
//     return (
//         <footer id="footer" className="footerBorder" style={{ marginBottom: '0px' }}>
//             <div className="col-12 w-100 py-3 footer-background">
//                 <div className="row">
//                     <div className="offset-6 col-6 footer-text"></div>
//                     <br /><br /><br /><br /><br /><br />

//                     {/* Social Icons + Hotline aligned to the right */}
//                     <div className="row text-light">
//                         <div className="ms-auto text-end pe-5">
//                             <ul className="list-inline footer-icons mb-2">
//                                 <li className="list-inline-item text-center mx-1">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://web.facebook.com/SLTMobitel?_rdc=1&_rdr"><div className="smicon1"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center mx-1">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://x.com/slt_mobitel"><div className="smicon2"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center mx-1">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://www.linkedin.com/company/srilankatelecom/posts/?feedView=all"><div className="smicon3"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center mx-1">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://www.instagram.com/sltmobitel_official/?hl=en"><div className="smicon4"></div></a>
//                                 </li>
//                                 <li className="list-inline-item text-center mx-1">
//                                     <a className="text-light text-decoration-none" target="_blank"
//                                         href="https://www.youtube.com/@SLTMobitel"><div className="smicon5"></div></a>
//                                 </li>
//                             </ul>

//                             {/* ✅ Hotline below icons, right aligned, black text */}
//                             <p className="mt-1 mb-0 fw-semibold" style={{ color: '#000', fontSize: '14px' }}>
//                                 Hotline – <a href="tel:0704765550" className="text-decoration-none" style={{ color: '#000' }}>070 476 5550</a>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }


//2025/11/27 new update



"use client";

export default function Footer() {
    return (
        <>
            <footer id="footer" className="footerBorder" style={{ marginBottom: '0px' }}>
                <div className="col-12 w-100 py-3 footer-background">
                    <div className="row">
                        {/* This empty div keeps structure – you can put left content here later */}
                        <div className="offset-6 col-6 footer-text"></div>

                        {/* Social Icons + Hotline aligned to the right */}
                        <div className="row text-light mt-3">
                            <div className="ms-auto text-end pe-5">
                                <ul className="list-inline footer-icons mb-2">
                                    <li className="list-inline-item text-center mx-1">
                                        <a
                                            className="text-light text-decoration-none"
                                            target="_blank"
                                            href="https://web.facebook.com/SLTMobitel?_rdc=1&_rdr"
                                        >
                                            <div className="smicon1" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item text-center mx-1">
                                        <a
                                            className="text-light text-decoration-none"
                                            target="_blank"
                                            href="https://x.com/slt_mobitel"
                                        >
                                            <div className="smicon2" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item text-center mx-1">
                                        <a
                                            className="text-light text-decoration-none"
                                            target="_blank"
                                            href="https://www.linkedin.com/company/srilankatelecom/posts/?feedView=all"
                                        >
                                            <div className="smicon3" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item text-center mx-1">
                                        <a
                                            className="text-light text-decoration-none"
                                            target="_blank"
                                            href="https://www.instagram.com/sltmobitel_official/?hl=en"
                                        >
                                            <div className="smicon4" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item text-center mx-1">
                                        <a
                                            className="text-light text-decoration-none"
                                            target="_blank"
                                            href="https://www.youtube.com/@SLTMobitel"
                                        >
                                            <div className="smicon5" />
                                        </a>
                                    </li>
                                </ul>

                                {/* Hotline */}
                                <p className="footer-hotline mt-1 mb-0">
                                    Hotline –{" "}
                                    <a
                                        href="tel:0704765550"
                                        className="text-decoration-none hotline-link"
                                    >
                                        070 476 5550
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ✅ CSS inside same file */}
            <style jsx>{`
    /* Main footer container (floating glass effect) */
    .footerBorder {
        position: relative;
        bottom: 0;
        width: 100%;
        backdrop-filter: blur(14px) saturate(180%);
        -webkit-backdrop-filter: blur(14px) saturate(180%);
        background: rgba(255, 255, 255, 0.55); /* Transparent white glass layer */
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0px -6px 20px rgba(0, 0, 0, 0.08);
        z-index: 1000;
    }

    /* Background gradient inside footer (stays subtle) */
    .footer-background {
        background: linear-gradient(135deg, rgba(240,245,255,0.55), rgba(255,255,255,0.35));
    }

    /* Social icons list */
    .footer-icons {
        padding: 0;
        margin: 0;
    }

    .footer-icons li {
        display: inline-block;
    }

    .footer-icons div {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background-size: 65%;
        background-repeat: no-repeat;
        background-position: center;
        background-color: rgba(255,255,255,0.65); /* Glass icon blocks */
        backdrop-filter: blur(6px) saturate(180%);
        -webkit-backdrop-filter: blur(6px) saturate(180%);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
        transition: 0.25s ease;
    }

    .footer-icons div:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    }

    /* Social icon images */
    .smicon1 {
        background-image: url("/icons/facebook.png");
    }
    .smicon2 {
        background-image: url("/icons/x.png");
    }
    .smicon3 {
        background-image: url("/icons/linkedin.png");
    }
    .smicon4 {
        background-image: url("/icons/instergram.png");
    }
    .smicon5 {
        background-image: url("/icons/youtube.png");
    }

    /* Hotline text */
    .footer-hotline {
        font-size: 14px;
        font-weight: 600;
        color: #000;
    }

    .hotline-link {
        color: #000;
    }

    .hotline-link:hover {
        color: #007a3d; /* Kaspersky green */
    }
`}</style>

        </>
    );
}
